import logging

from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from django.utils import timezone

from django.contrib.auth import get_user_model

from .models import EventRegistration

User = get_user_model()

logger = logging.getLogger(__name__)


def send_event_email(subject, message, recipient):
    """
    Send an individual event notification email.
    Email failures should not interrupt the main API operation.
    """

    if not recipient:
        return

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient],
            fail_silently=False
        )

    except Exception:
        logger.exception(
            "Failed to send event email to %s",
            recipient
        )


def queue_event_email(subject, message, recipient):
    """
    Send email only after the database transaction commits.
    """

    if not recipient:
        return

    transaction.on_commit(
        lambda: send_event_email(
            subject,
            message,
            recipient
        )
    )


def get_event_details(event):

    return f"""
Event: {event.title}

Category: {event.get_category_display()}

Mode: {event.get_mode_display()}

Start Date: {timezone.localtime(event.start_date)}

End Date: {timezone.localtime(event.end_date)}

Venue: {event.venue or 'Online'}

Description:
{event.short_description}
"""


# 1. New Event Published
def notify_event_published(event):

    members = User.objects.filter(
        role="club_member",
        is_email_verified=True,
        is_active=True
    ).exclude(
        email=""
    )

    for member in members.iterator():

        queue_event_email(
            subject=f"New Event Published: {event.title}",

            message=f"""
Hello {member.full_name},

A new event has been published on TCH!

{get_event_details(event)}

Visit the TCH website to learn more and register.

Regards,
TCH Team
""",

            recipient=member.email
        )


# 2. Registration Successful
def notify_registration_confirmed(registration):

    user = registration.user
    event = registration.event

    queue_event_email(
        subject=f"Registration Confirmed: {event.title}",

        message=f"""
Hello {user.full_name},

Your registration for the following event has been confirmed.

{get_event_details(event)}

We look forward to seeing you!

Regards,
TCH Team
""",

        recipient=user.email
    )


# 3. Registration Cancelled
def notify_registration_cancelled(registration):

    user = registration.user
    event = registration.event

    queue_event_email(
        subject=f"Registration Cancelled: {event.title}",

        message=f"""
Hello {user.full_name},

Your registration for {event.title} has been cancelled.

If you cancelled this registration by mistake, please visit the TCH website.

Regards,
TCH Team
""",

        recipient=user.email
    )


# 4. Event Updated
def notify_event_updated(event):

    registrations = EventRegistration.objects.filter(
        event=event,
        status="confirmed"
    ).select_related("user")

    for registration in registrations.iterator():

        queue_event_email(
            subject=f"Event Updated: {event.title}",

            message=f"""
Hello {registration.user.full_name},

The details of an event you registered for have been updated.

{get_event_details(event)}

Please check the TCH website for the latest information.

Regards,
TCH Team
""",

            recipient=registration.user.email
        )


# 5. Event Cancelled
def notify_event_cancelled(event):

    registrations = EventRegistration.objects.filter(
        event=event,
        status="confirmed"
    ).select_related("user")

    for registration in registrations.iterator():

        queue_event_email(
            subject=f"Event Cancelled: {event.title}",

            message=f"""
Hello {registration.user.full_name},

We regret to inform you that the following event has been cancelled.

Event: {event.title}

Please visit the TCH website for further announcements.

We apologize for the inconvenience.

Regards,
TCH Team
""",

            recipient=registration.user.email
        )


# 6. Organizer Assigned
def notify_organizer_assigned(organizer):

    member = organizer.member
    event = organizer.event

    queue_event_email(
        subject=f"You have been assigned to: {event.title}",

        message=f"""
Hello {member.full_name},

You have been assigned as an organizer for an upcoming TCH event.

Event: {event.title}

Your Responsibility: {organizer.responsibility}

{get_event_details(event)}

Regards,
TCH Team
""",

        recipient=member.email
    )


# 7. Event Reminder
def notify_event_reminder(registration):

    user = registration.user
    event = registration.event

    queue_event_email(
        subject=f"Event Reminder: {event.title}",

        message=f"""
Hello {user.full_name},

This is a reminder about an event you registered for.

{get_event_details(event)}

We look forward to seeing you!

Regards,
TCH Team
""",

        recipient=user.email
    )