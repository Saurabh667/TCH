# from django.contrib.auth.tokens import PasswordResetTokenGenerator


# class EmailVerificationTokenGenerator(PasswordResetTokenGenerator):
#     def _make_hash_value(self, user, timestamp):
#         return f"{user.pk}{user.is_email_verified}{timestamp}"


# email_verification_token = EmailVerificationTokenGenerator()


from django.contrib.auth.tokens import PasswordResetTokenGenerator


class PendingRegistrationTokenGenerator(PasswordResetTokenGenerator):

    def _make_hash_value(self, pending, timestamp):
        return f"{pending.pk}{pending.email}{pending.password}{timestamp}"


email_verification_token = PendingRegistrationTokenGenerator()
