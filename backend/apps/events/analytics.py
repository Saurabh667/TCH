import csv
from datetime import timedelta

from django.db.models import Count, Q
from django.db.models.functions import TruncMonth
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.utils.text import slugify


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Event, EventRegistration
from .permissions import IsAdminOrCoreTeam



def generate_registration_csv(registrations, filename):
    response = HttpResponse(
        content_type="text/csv"
    )
    response["Content-Disposition"] = (
        f'attachment; filename="{filename}"'
    )
    writer = csv.writer(response)
    writer.writerow([
        "Event ID",
        "Event Title",
        "Participant Name",
        "Student ID",
        "Email",
        "Registration Date",
        "Registration Status",
        "Attendance Status",
        "Certificate Issued",
    ])
    for registration in registrations:
        user = registration.user
        event = registration.event
        writer.writerow([
            event.id,
            event.title,
            user.full_name,
            user.student_id,
            user.email,
            registration.registration_date,
            registration.status,
            registration.attendance_status,
            registration.certificate_issued,
        ])
    return response



class EventAnalyticsView(APIView):
    """
    Role-based event analytics.

    Admin/Core Team: Complete event analytics.
    Club Member: Personal event analytics.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user
        now = timezone.now()

        # =====================================
        # ADMIN / CORE TEAM ANALYTICS
        # =====================================

        if user.role == "admin" or user.role == "core_team" or user.is_superuser:

            events = Event.objects.all()

            registrations = EventRegistration.objects.all()

            event_stats = events.aggregate(
                total_events=Count("id"),

                upcoming_events=Count(
                    "id",
                    filter=Q(
                        start_date__gt=now,
                        status="published"
                    )
                ),

                completed_events=Count(
                    "id",
                    filter=Q(end_date__lt=now)
                ),

                cancelled_events=Count(
                    "id",
                    filter=Q(status="cancelled")
                ),

                draft_events=Count(
                    "id",
                    filter=Q(status="draft")
                ),
            )

            registration_stats = registrations.aggregate(
                total_registrations=Count("id"),

                confirmed=Count(
                    "id",
                    filter=Q(status="confirmed")
                ),

                pending=Count(
                    "id",
                    filter=Q(status="pending")
                ),

                rejected=Count(
                    "id",
                    filter=Q(status="rejected")
                ),

                cancelled=Count(
                    "id",
                    filter=Q(status="cancelled")
                ),
            )

            attendance_stats = registrations.aggregate(
                present=Count(
                    "id",
                    filter=Q(
                        status="confirmed",
                        attendance_status="present"
                    )
                ),

                absent=Count(
                    "id",
                    filter=Q(
                        status="confirmed",
                        attendance_status="absent"
                    )
                ),

                not_marked=Count(
                    "id",
                    filter=Q(
                        status="confirmed",
                        attendance_status="not_marked"
                    )
                ),
            )

            # Most popular events
            popular_events = events.annotate(
                registration_count=Count(
                    "eventregistration",
                    distinct=True
                )
            ).order_by("-registration_count")[:5]

            popular_events_data = [
                {
                    "id": event.id,
                    "title": event.title,
                    "category": event.category,
                    "registration_count": event.registration_count,
                    "status": event.status,
                }
                for event in popular_events
            ]

            # Category-wise distribution
            category_distribution = (
                events.values("category")
                .annotate(total=Count("id"))
                .order_by("-total")
            )

            # Monthly registration trends (last 6 months)
            six_months_ago = now - timedelta(days=180)

            registration_trends = (
                registrations.filter(
                    registration_date__gte=six_months_ago
                )
                .annotate(
                    month=TruncMonth("registration_date")
                )
                .values("month")
                .annotate(total=Count("id"))
                .order_by("month")
            )

            return Response({
                "role": "admin_dashboard",

                "events": event_stats,

                "registrations": registration_stats,

                "attendance": attendance_stats,

                "popular_events": popular_events_data,

                "category_distribution": list(category_distribution),

                "registration_trends": [
                    {
                        "month": item["month"].strftime("%Y-%m"),
                        "total": item["total"],
                    }
                    for item in registration_trends
                ],
            })

        # =====================================
        # CLUB MEMBER ANALYTICS
        # =====================================

        if user.role == "club_member":

            my_registrations = EventRegistration.objects.filter(
                user=user
            )

            my_stats = my_registrations.aggregate(
                total_registrations=Count("id"),

                confirmed=Count(
                    "id",
                    filter=Q(status="confirmed")
                ),

                attended=Count(
                    "id",
                    filter=Q(
                        status="confirmed",
                        attendance_status="present"
                    )
                ),

                absent=Count(
                    "id",
                    filter=Q(
                        status="confirmed",
                        attendance_status="absent"
                    )
                ),

                upcoming_events=Count(
                    "id",
                    filter=Q(
                        status="confirmed",
                        event__status="published",
                        event__start_date__gt=now
                    )
                ),
            )

            recent_registrations = (
                my_registrations
                .select_related("event")
                .order_by("-registration_date")[:5]
            )

            recent_data = [
                {
                    "event_id": registration.event.id,
                    "event_title": registration.event.title,
                    "event_date": registration.event.start_date,
                    "registration_date": registration.registration_date,
                    "status": registration.status,
                    "attendance_status": registration.attendance_status,
                }
                for registration in recent_registrations
            ]

            return Response({
                "role": "member_dashboard",
                "statistics": my_stats,
                "recent_registrations": recent_data,
            })

        return Response(
            {"detail": "You do not have permission to view analytics."},
            status=403
        )




class EventWiseAnalyticsView(APIView):

    permission_classes = [IsAuthenticated, IsAdminOrCoreTeam]

    def get(self, request, event_id):

        event = get_object_or_404(Event, id=event_id)

        registrations = EventRegistration.objects.filter(
            event=event
        )

        # Registration statistics
        registration_stats = registrations.aggregate(
            total=Count("id"),
            confirmed=Count("id", filter=Q(status="confirmed")),
            pending=Count("id", filter=Q(status="pending")),
            rejected=Count("id", filter=Q(status="rejected")),
            cancelled=Count("id", filter=Q(status="cancelled")),
        )

        # Attendance statistics
        attendance_stats = registrations.aggregate(
            present=Count(
                "id",
                filter=Q(
                    status="confirmed",
                    attendance_status="present"
                )
            ),
            absent=Count(
                "id",
                filter=Q(
                    status="confirmed",
                    attendance_status="absent"
                )
            ),
            not_marked=Count(
                "id",
                filter=Q(
                    status="confirmed",
                    attendance_status="not_marked"
                )
            ),
        )

        # Attendance percentage
        marked_attendance = (
            attendance_stats["present"] +
            attendance_stats["absent"]
        )

        attendance_percentage = (
            round(
                attendance_stats["present"] / marked_attendance * 100,
                2
            )
            if marked_attendance else 0
        )

        # Registration capacity percentage
        capacity_percentage = None

        if event.max_participants:
            capacity_percentage = round(
                registration_stats["confirmed"] /
                event.max_participants * 100,
                2
            )

        # Organizer count
        organizer_count = event.organizers.count()

        return Response({
            "event": {
                "id": event.id,
                "title": event.title,
                "category": event.category,
                "status": event.status,
                "start_date": event.start_date,
                "end_date": event.end_date,
                "max_participants": event.max_participants,
            },

            "registrations": registration_stats,

            "attendance": {
                **attendance_stats,
                "attendance_percentage": attendance_percentage,
            },

            "capacity": {
                "maximum": event.max_participants,
                "confirmed": registration_stats["confirmed"],
                "percentage": capacity_percentage,
            },

            "organizers": {
                "total": organizer_count,
            },
        })


class GlobalAnalyticsExportView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminOrCoreTeam
    ]

    def get(self, request):

        registrations = (
            EventRegistration.objects
            .select_related("user", "event")
            .order_by("-registration_date")
        )

        return generate_registration_csv(
            registrations,
            "tch_event_analytics.csv"
        )



class EventAnalyticsExportView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminOrCoreTeam
    ]

    def get(self, request, event_id):

        event = get_object_or_404(
            Event,
            id=event_id
        )

        registrations = (
            EventRegistration.objects
            .filter(event=event)
            .select_related("user", "event")
            .order_by("-registration_date")
        )

        filename = (
            f"{slugify(event.title)}_report.csv"
        )

        return generate_registration_csv(
            registrations,
            filename
        )