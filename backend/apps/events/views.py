from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import Event,EventRegistration,EventOrganizer,EventImage
from .permissions import IsAdminOrCoreTeam, CanManageEvent
from .pagination import EventPagination

from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db import transaction
from django.db.models import Count

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .serializers import (EventRegistrationSerializer,EventSerializer,EventOrganizerSerializer,AttendanceSerializer,EventImageSerializer)
from .permissions import (
    IsClubMember,
    CanManageEventRegistrations,
    CanManageEventOrganizers,
    CanManageEventAttendance,
    CanManageEventMedia
)
from django.db import transaction
from django.utils import timezone
from .notifications import (
    notify_registration_confirmed,
    notify_registration_cancelled,
    notify_event_published,
    notify_event_updated,
    notify_event_cancelled,
    notify_organizer_assigned
)

class EventViewSet(viewsets.ModelViewSet):

    serializer_class = EventSerializer
    pagination_class = EventPagination

    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser,
    ]

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "title",
        "description",
        "short_description",
        "venue",
    ]

    ordering_fields = [
        "start_date",
        "created_at",
        "title",
    ]

    ordering = ["-created_at"]

    def get_queryset(self):

        user = self.request.user

        queryset = Event.objects.select_related(
            "created_by"
        ).prefetch_related(
            "organizers"
        )

        # Admin can see all events.
        if user.is_superuser or user.role == "admin":
            pass

        # Core Team can see all events.
        elif user.role == "core_team":
            pass

        # Club Members can see published events only.
        else:
            queryset = queryset.filter(status="published")

        # Optional category filter.
        category = self.request.query_params.get("category")

        if category:
            queryset = queryset.filter(category=category)

        # Optional mode filter.
        mode = self.request.query_params.get("mode")

        if mode:
            queryset = queryset.filter(mode=mode)

        # Optional status filter.
        status = self.request.query_params.get("status")

        # Only Admin and Core Team can filter by status.
        if status and (
            user.is_superuser
            or user.role in ["admin", "core_team"]
        ):
            queryset = queryset.filter(status=status)

        return queryset

    def get_permissions(self):

        # Only Admin/Core Team can create.
        if self.action == "create":
            permission_classes = [
                IsAuthenticated,
                IsAdminOrCoreTeam,
            ]

        # All authenticated users can access list/retrieve.
        # Queryset and object permissions control visibility.
        elif self.action in ["list", "retrieve"]:
            permission_classes = [
                IsAuthenticated,
                CanManageEvent,
            ]

        # Admin/Core Team must pass role and object checks.
        else:
            permission_classes = [
                IsAuthenticated,
                IsAdminOrCoreTeam,
                CanManageEvent,
            ]

        return [
            permission()
            for permission in permission_classes
        ]

    def perform_create(self, serializer):
        event = serializer.save(
        created_by=self.request.user
        )

        if event.status == "published":
            notify_event_published(event)

        # serializer.save(
        #     created_by=self.request.user
        # )
    def perform_update(self, serializer):

        old_status = self.get_object().status

        event = serializer.save()

        # Draft -> Published
        if (
            old_status != "published"
            and event.status == "published"
        ):
            notify_event_published(event)

        # Published -> Cancelled
        elif (
            old_status == "published"
            and event.status == "cancelled"
        ):
            notify_event_cancelled(event)

        # Published event details changed.
        elif (
            old_status == "published"
            and event.status == "published"
        ):
            notify_event_updated(event)


class EventRegistrationView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsClubMember,
    ]

    def post(self, request, event_id):

        with transaction.atomic():

            event = get_object_or_404(
                Event.objects.select_for_update(),
                id=event_id
            )

            now = timezone.now()

            # Event must be published.
            if event.status != "published":
                return Response(
                    {"error": "This event is not available for registration."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Registration must be required.
            if not event.registration_required:
                return Response(
                    {"error": "Registration is not required for this event."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Event must not have started.
            if event.start_date <= now:
                return Response(
                    {"error": "Registration is closed because the event has started."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Registration opening date.
            if event.registration_start and now < event.registration_start:
                return Response(
                    {"error": "Registration has not started yet."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Registration closing date.
            if event.registration_end and now > event.registration_end:
                return Response(
                    {"error": "Registration deadline has passed."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check existing registration.
            registration = EventRegistration.objects.filter(
                event=event,
                user=request.user
            ).first()

            if registration and registration.status != "cancelled":
                return Response(
                    {"error": "You have already registered for this event."},
                    status=status.HTTP_409_CONFLICT
                )

            # Check participant capacity.
            if event.max_participants is not None:

                registered_count = EventRegistration.objects.filter(
                    event=event,
                    status="confirmed"
                ).count()

                if registered_count >= event.max_participants:
                    return Response(
                        {"error": "Sorry, this event is fully booked."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Reactivate a cancelled registration.
            if registration:

                registration.status = "confirmed"
                registration.registration_date = now
                registration.attendance_status = "not_marked"
                registration.attended_at = None
                registration.certificate_issued = False

                registration.save()

                notify_registration_confirmed(registration)

            else:

                registration = EventRegistration.objects.create(
                    event=event,
                    user=request.user,
                    status="confirmed"
                )
                notify_registration_confirmed(registration)
        return Response(
            {
                "message": "Successfully registered for the event.",
                "registration": EventRegistrationSerializer(registration).data
            },
            status=status.HTTP_201_CREATED
        )



class MyEventRegistrationsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        registrations = EventRegistration.objects.filter(
            user=request.user
        ).select_related(
            "event"
        ).order_by("-registration_date")

        serializer = EventRegistrationSerializer(
            registrations,
            many=True
        )

        return Response(serializer.data)

class CancelEventRegistrationView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsClubMember,
    ]

    def post(self, request, event_id):

        registration = get_object_or_404(
            EventRegistration,
            event_id=event_id,
            user=request.user
        )

        if registration.status == "cancelled":
            notify_registration_cancelled(registration)
            return Response(
                {"error": "Registration is already cancelled."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if registration.status != "confirmed":
            return Response(
                {"error": "Only confirmed registrations can be cancelled."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if registration.attendance_status == "present":
            return Response(
                {"error": "You cannot cancel a registration after attendance has been marked."},
                status=status.HTTP_400_BAD_REQUEST
            )

        registration.status = "cancelled"
        registration.save(update_fields=["status"])

        return Response(
            {"message": "Registration cancelled successfully."},
            status=status.HTTP_200_OK
        )


class EventParticipantsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, event_id):

        event = get_object_or_404(
            Event,
            id=event_id
        )

        permission = CanManageEventRegistrations()

        if not permission.has_object_permission(
            request,
            self,
            event
        ):
            return Response(
                {"error": "You are not allowed to view these participants."},
                status=status.HTTP_403_FORBIDDEN
            )

        registrations = EventRegistration.objects.filter(
            event=event
        ).select_related(
            "user"
        ).order_by("-registration_date")

        serializer = EventRegistrationSerializer(
            registrations,
            many=True
        )

        return Response({
            "event": event.title,
            "total_registrations": registrations.count(),
            "participants": serializer.data
        })


class ManageRegistrationStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, registration_id):

        registration = get_object_or_404(
            EventRegistration.objects.select_related("event"),
            id=registration_id
        )

        permission = CanManageEventRegistrations()

        if not permission.has_object_permission(
            request,
            self,
            registration.event
        ):
            return Response(
                {"error": "You are not allowed to manage this registration."},
                status=status.HTTP_403_FORBIDDEN
            )

        new_status = request.data.get("status")

        allowed_statuses = ["confirmed", "rejected"]

        if new_status not in allowed_statuses:
            return Response(
                {"error": "Invalid status. Use confirmed or rejected."},
                status=status.HTTP_400_BAD_REQUEST
            )

        registration.status = new_status
        registration.save(update_fields=["status"])

        return Response({
            "message": "Registration status updated successfully.",
            "registration": EventRegistrationSerializer(registration).data
        })



class EventOrganizerListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get_event(self, request, event_id):

        event = get_object_or_404(
            Event,
            id=event_id
        )

        permission = CanManageEventOrganizers()

        if not permission.has_object_permission(
            request,
            self,
            event
        ):
            return None

        return event

    # GET: List all organizers of an event.
    def get(self, request, event_id):

        event = self.get_event(
            request,
            event_id
        )

        if event is None:
            return Response(
                {"error": "You are not authorized to view these organizers."},
                status=status.HTTP_403_FORBIDDEN
            )

        organizers = EventOrganizer.objects.filter(
            event=event
        ).select_related(
            "member",
            "assigned_by"
        )

        serializer = EventOrganizerSerializer(
            organizers,
            many=True
        )

        return Response({
            "event": event.title,
            "total_organizers": organizers.count(),
            "organizers": serializer.data
        })

    # POST: Assign an organizer.
    def post(self, request, event_id):

        event = self.get_event(
            request,
            event_id
        )

        if event is None:
            return Response(
                {"error": "You are not authorized to assign organizers."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = EventOrganizerSerializer(
            data=request.data,
            context={"event": event}
        )

        serializer.is_valid(raise_exception=True)

        # serializer.save(
        #     event=event,
        #     assigned_by=request.user
        # )
        organizer = serializer.save(
            event=event,
            assigned_by=request.user
        )
        
        notify_organizer_assigned(organizer)

        return Response(
            {
                "message": "Organizer assigned successfully.",
                "organizer": serializer.data
            },
            status=status.HTTP_201_CREATED
        )


class EventOrganizerDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get_organizer(self, request, organizer_id):

        organizer = get_object_or_404(
            EventOrganizer.objects.select_related("event"),
            id=organizer_id
        )

        permission = CanManageEventOrganizers()

        if not permission.has_object_permission(
            request,
            self,
            organizer.event
        ):
            return None

        return organizer

    # PATCH: Update organizer.
    def patch(self, request, organizer_id):

        organizer = self.get_organizer(
            request,
            organizer_id
        )

        if organizer is None:
            return Response(
                {"error": "You are not authorized to update this organizer."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = EventOrganizerSerializer(
            organizer,
            data=request.data,
            partial=True,
            context={"event": organizer.event}
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response({
            "message": "Organizer updated successfully.",
            "organizer": serializer.data
        })

    # DELETE: Remove organizer.
    def delete(self, request, organizer_id):

        organizer = self.get_organizer(
            request,
            organizer_id
        )

        if organizer is None:
            return Response(
                {"error": "You are not authorized to remove this organizer."},
                status=status.HTTP_403_FORBIDDEN
            )

        organizer.delete()

        return Response(
            {"message": "Organizer removed successfully."},
            status=status.HTTP_200_OK
        )


class EventAttendanceView(APIView):

    permission_classes = [IsAuthenticated]

    def get_event(self, request, event_id):

        event = get_object_or_404(
            Event,
            id=event_id
        )

        permission = CanManageEventAttendance()

        if not permission.has_object_permission(
            request,
            self,
            event
        ):
            return None

        return event

    def get(self, request, event_id):

        event = self.get_event(
            request,
            event_id
        )

        if event is None:
            return Response(
                {"error": "You are not authorized to view attendance."},
                status=status.HTTP_403_FORBIDDEN
            )

        registrations = EventRegistration.objects.filter(
            event=event,
            status="confirmed"
        ).select_related(
            "user"
        ).order_by("user__full_name")

        serializer = AttendanceSerializer(
            registrations,
            many=True
        )

        total = registrations.count()

        present = registrations.filter(
            attendance_status="present"
        ).count()

        absent = registrations.filter(
            attendance_status="absent"
        ).count()

        not_marked = registrations.filter(
            attendance_status="not_marked"
        ).count()

        return Response({
            "event": event.title,
            "statistics": {
                "total_confirmed": total,
                "present": present,
                "absent": absent,
                "not_marked": not_marked
            },
            "participants": serializer.data
        })



class MarkAttendanceView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, registration_id):

        registration = get_object_or_404(
            EventRegistration.objects.select_related("event"),
            id=registration_id
        )

        permission = CanManageEventAttendance()

        if not permission.has_object_permission(
            request,
            self,
            registration.event
        ):
            return Response(
                {"error": "You are not authorized to update attendance."},
                status=status.HTTP_403_FORBIDDEN
            )

        if registration.status != "confirmed":

            return Response(
                {"error": "Attendance can only be marked for confirmed registrations."},
                status=status.HTTP_400_BAD_REQUEST
            )

        attendance_status = request.data.get("attendance_status")

        allowed_statuses = ["present", "absent"]

        if attendance_status not in allowed_statuses:

            return Response(
                {
                    "error": "Invalid attendance status. Use present or absent."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        registration.attendance_status = attendance_status

        if attendance_status == "present":
            registration.attended_at = timezone.now()
        else:
            registration.attended_at = None

        registration.save(
            update_fields=[
                "attendance_status",
                "attended_at"
            ]
        )

        return Response({
            "message": "Attendance updated successfully.",
            "attendance": AttendanceSerializer(registration).data
        })
    

class BulkAttendanceView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):

        event = get_object_or_404(
            Event,
            id=event_id
        )

        permission = CanManageEventAttendance()

        if not permission.has_object_permission(
            request,
            self,
            event
        ):
            return Response(
                {"error": "You are not authorized to manage attendance."},
                status=status.HTTP_403_FORBIDDEN
            )

        attendance_data = request.data.get("attendance", [])

        if not isinstance(attendance_data, list) or not attendance_data:
            return Response(
                {"error": "Provide a non-empty attendance list."},
                status=status.HTTP_400_BAD_REQUEST
            )

        registration_ids = []

        for item in attendance_data:

            if not isinstance(item, dict):
                return Response(
                    {"error": "Each attendance entry must be an object."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            registration_id = item.get("registration_id")
            attendance_status = item.get("attendance_status")

            if not registration_id:
                return Response(
                    {"error": "registration_id is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if attendance_status not in ["present", "absent"]:
                return Response(
                    {"error": "Attendance must be present or absent."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if registration_id in registration_ids:
                return Response(
                    {"error": "Duplicate registration IDs are not allowed."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            registration_ids.append(registration_id)

        with transaction.atomic():

            registrations = list(
                EventRegistration.objects.select_for_update().filter(
                    event=event,
                    id__in=registration_ids
                )
            )

            if len(registrations) != len(registration_ids):
                return Response(
                    {"error": "One or more registrations do not belong to this event."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            registration_map = {
                registration.id: registration
                for registration in registrations
            }

            now = timezone.now()

            for item in attendance_data:

                registration = registration_map[
                    item["registration_id"]
                ]

                if registration.status != "confirmed":
                    return Response(
                        {
                            "error": (
                                f"Registration {registration.id} "
                                "is not confirmed."
                            )
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                registration.attendance_status = item["attendance_status"]

                registration.attended_at = (
                    now
                    if item["attendance_status"] == "present"
                    else None
                )

            EventRegistration.objects.bulk_update(
                registrations,
                ["attendance_status", "attended_at"]
            )

        return Response({
            "message": "Bulk attendance updated successfully.",
            "updated_count": len(registrations)
        })



class MyEventAttendanceView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        registrations = EventRegistration.objects.filter(
            user=request.user
        ).select_related(
            "event"
        ).order_by("-event__start_date")

        data = []

        for registration in registrations:

            data.append({
                "event_id": registration.event.id,
                "event_title": registration.event.title,
                "event_start_date": registration.event.start_date,
                "registration_status": registration.status,
                "attendance_status": registration.attendance_status,
                "attended_at": registration.attended_at
            })

        return Response(data)



class EventGalleryView(APIView):

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def get_event(self, request, event_id):

        event = get_object_or_404(
            Event,
            id=event_id
        )

        # Published gallery can be viewed publicly.
        if event.status == "published":
            return event

        # Draft/cancelled event media requires Admin/Core access.
        if not request.user.is_authenticated:
            return None

        permission = CanManageEventMedia()

        if permission.has_object_permission(
            request,
            self,
            event
        ):
            return event

        return None

    # GET: View gallery.
    def get(self, request, event_id):

        event = self.get_event(
            request,
            event_id
        )

        if event is None:
            return Response(
                {"error": "Gallery not found or access denied."},
                status=status.HTTP_404_NOT_FOUND
            )

        images = EventImage.objects.filter(
            event=event
        ).select_related(
            "uploaded_by"
        )

        serializer = EventImageSerializer(
            images,
            many=True,
            context={"request": request}
        )

        return Response({
            "event": event.title,
            "total_images": images.count(),
            "images": serializer.data
        })

    # POST: Upload gallery image.
    def post(self, request, event_id):

        if not request.user.is_authenticated:
            return Response(
                {"error": "Authentication required."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        event = get_object_or_404(
            Event,
            id=event_id
        )

        permission = CanManageEventMedia()

        if not permission.has_object_permission(
            request,
            self,
            event
        ):
            return Response(
                {"error": "You are not authorized to upload images."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = EventImageSerializer(
            data=request.data,
            context={"request": request}
        )

        serializer.is_valid(raise_exception=True)

        serializer.save(
            event=event,
            uploaded_by=request.user
        )

        return Response(
            {
                "message": "Image uploaded successfully.",
                "image": serializer.data
            },
            status=status.HTTP_201_CREATED
        )


class EventGalleryDetailView(APIView):

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def get_image(self, request, image_id):

        image = get_object_or_404(
            EventImage.objects.select_related("event"),
            id=image_id
        )

        permission = CanManageEventMedia()

        if not request.user.is_authenticated:
            return None

        if not permission.has_object_permission(
            request,
            self,
            image.event
        ):
            return None

        return image

    # PATCH: Update caption or image.
    def patch(self, request, image_id):

        image = self.get_image(
            request,
            image_id
        )

        if image is None:
            return Response(
                {"error": "You are not authorized to update this image."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = EventImageSerializer(
            image,
            data=request.data,
            partial=True,
            context={"request": request}
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            "message": "Image updated successfully.",
            "image": serializer.data
        })

    # DELETE: Remove image.
    def delete(self, request, image_id):

        image = self.get_image(
            request,
            image_id
        )

        if image is None:
            return Response(
                {"error": "You are not authorized to delete this image."},
                status=status.HTTP_403_FORBIDDEN
            )

        image.delete()

        return Response(
            {"message": "Image deleted successfully."},
            status=status.HTTP_200_OK
        )



class EventBannerView(APIView):

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    permission_classes = [IsAuthenticated]

    def patch(self, request, event_id):

        event = get_object_or_404(
            Event,
            id=event_id
        )

        permission = CanManageEventMedia()

        if not permission.has_object_permission(
            request,
            self,
            event
        ):
            return Response(
                {"error": "You are not authorized to update this banner."},
                status=status.HTTP_403_FORBIDDEN
            )

        banner = request.FILES.get("banner")

        if not banner:
            return Response(
                {"error": "Please provide a banner image."},
                status=status.HTTP_400_BAD_REQUEST
            )

        allowed_types = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ]

        if getattr(banner, "content_type", None) not in allowed_types:
            return Response(
                {"error": "Only JPG, PNG and WEBP images are allowed."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if banner.size > 5 * 1024 * 1024:
            return Response(
                {"error": "Banner size cannot exceed 5 MB."},
                status=status.HTTP_400_BAD_REQUEST
            )

        event.banner = banner

        event.save(update_fields=["banner", "updated_at"])

        return Response({
            "message": "Event banner updated successfully.",
            "banner": request.build_absolute_uri(event.banner.url)
        })