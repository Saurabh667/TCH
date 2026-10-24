from django.conf import settings
from django.core.mail import send_mail

from .tokens import email_verification_token


def send_verification_email(user):
    token = email_verification_token.make_token(user)

    verification_url = (
        f"{settings.FRONTEND_URL}/verify-email"
        f"?uid={user.pk}&token={token}"
    )

    send_mail(
        subject="Verify your CSE Club account",
        message=(
            f"Hello {user.full_name},\n\n"
            "Please open the following link to verify your email:\n\n"
            f"{verification_url}\n\n"
            "If you did not register, you can ignore this email."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )