from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.events.models import EventRegistration
from apps.events.notifications import notify_event_reminder


class Command(BaseCommand):

    help = "Send event reminders 24 hours before events."

    def handle(self, *args, **kwargs):

        now = timezone.now()

        start_time = now + timedelta(hours=24)

        end_time = start_time + timedelta(minutes=5)

        registrations = EventRegistration.objects.filter(
            event__status="published",
            event__start_date__gte=start_time,
            event__start_date__lt=end_time,
            status="confirmed",
            reminder_sent_at__isnull=True
        ).select_related(
            "event",
            "user"
        )

        sent_count = 0

        for registration in registrations:

            notify_event_reminder(registration)
            registration.reminder_sent_at=timezone.now()

            registration.save(
                update_fields=["reminder_sent_at"]
            )
            sent_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Queued {sent_count} event reminders."
            )
        )