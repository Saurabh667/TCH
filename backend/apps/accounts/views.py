# from django.contrib.auth import get_user_model
# from rest_framework import generics, status
# from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

# from .serializers import RegisterSerializer,EmailTokenObtainPairSerializer,UserProfileSerializer,CoreTeamMemberSerializer,MemberApplication,MemberApplicationSerializer
# from .utils import send_verification_email
# from .tokens import email_verification_token

# from .models import CoreTeam,MemberApplication

# User = get_user_model()


from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone
from datetime import timedelta

from rest_framework import generics, status
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    RegisterSerializer,
    EmailTokenObtainPairSerializer,
    UserProfileSerializer,
    CoreTeamMemberSerializer,
    MemberApplicationSerializer,
)
from .utils import send_verification_email
from .tokens import email_verification_token
from .models import CoreTeam, MemberApplication, PendingRegistration

User = get_user_model()


# class RegisterView(generics.CreateAPIView):
#     serializer_class = RegisterSerializer
#     permission_classes = [AllowAny]

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()

#         try:
#             send_verification_email(user)
#         except Exception:
#             user.delete()
#             return Response(
#                 {"detail": "Registration failed because the verification email could not be sent. Please try again."},
#                 status=status.HTTP_503_SERVICE_UNAVAILABLE,
#             )

#         return Response(
#             {
#                 "message": "Registration successful. Check your email to verify your account.",
#                 "user": {
#                     "id": user.id,
#                     "full_name": user.full_name,
#                     "email": user.email,
#                     "student_id": user.student_id,
#                     "role": user.role,
#                     "is_email_verified": user.is_email_verified,
#                 },
#             },
#             status=status.HTTP_201_CREATED,
#         )


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        pending = serializer.save()

        try:
            send_verification_email(pending)
        except Exception:
            pending.delete()
            return Response(
                {
                    "detail": (
                        "Unable to send the verification email. "
                        "Please try registering again."
                    )
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return Response(
            {
                "message": (
                    "Registration received. Please verify your email "
                    "within 24 hours to create your account."
                ),
                "email": pending.email,
                "verification_required": True,
            },
            status=status.HTTP_201_CREATED,
        )


# class VerifyEmailView(APIView):
#     permission_classes = [AllowAny]
#     authentication_classes = []

#     def post(self, request):
#         uid = request.data.get("uid")
#         token = request.data.get("token")

#         if not uid or not token:
#             return Response(
#                 {"detail": "Both uid and token are required."},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         try:
#             user = User.objects.get(pk=uid)
#         except (User.DoesNotExist, ValueError, TypeError):
#             return Response(
#                 {"detail": "Invalid verification link."},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         if user.is_email_verified:
#             return Response(
#                 {"message": "Your email is already verified."},
#                 status=status.HTTP_200_OK,
#             )

#         if not email_verification_token.check_token(user, token):
#             return Response(
#                 {
#                     "detail": (
#                         "This verification link is invalid or has expired. "
#                         "Please request a new verification email."
#                     )
#                 },
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         user.is_email_verified = True
#         user.save(update_fields=["is_email_verified"])

#         return Response(
#             {
#                 "message": "Email verified successfully. You can now log in.",
#                 "is_email_verified": True,
#             },
#             status=status.HTTP_200_OK,
#         )

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        uid = request.data.get("uid")
        token = request.data.get("token")

        if not uid or not token:
            return Response(
                {"detail": "Both uid and token are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            pending = PendingRegistration.objects.get(pk=uid)
        except (PendingRegistration.DoesNotExist, ValueError, TypeError):
            return Response(
                {
                    "detail": (
                        "Invalid or expired verification link. "
                        "Please register again."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if pending.is_expired():
            pending.delete()
            return Response(
                {
                    "detail": (
                        "Your verification link has expired. "
                        "Please register again."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not email_verification_token.check_token(pending, token):
            return Response(
                {
                    "detail": (
                        "Invalid verification link. "
                        "Please request a new verification email."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():
            pending = PendingRegistration.objects.select_for_update().get(
                pk=pending.pk
            )

            if User.objects.filter(email__iexact=pending.email).exists():
                pending.delete()
                return Response(
                    {
                        "detail": (
                            "An account with this email already exists. "
                            "Please log in."
                        )
                    },
                    status=status.HTTP_409_CONFLICT,
                )

            user = User.objects.create_user(
                email=pending.email,
                password=None,
                full_name=pending.full_name,
                department=pending.department,
                year_of_study=pending.year_of_study,
                phone=pending.phone,
                role=User.Role.CLUB_MEMBER,
                is_active=True,
                is_email_verified=True,
            )

            # Transfer the already-hashed password without hashing it again.
            user.password = pending.password
            user.save(update_fields=["password"])

            pending.delete()

        return Response(
            {
                "message": (
                    "Email verified successfully. "
                    "Your account has been created. You can now log in."
                ),
                "is_email_verified": True,
                "user": {
                    "id": user.id,
                    "full_name": user.full_name,
                    "email": user.email,
                    "student_id": user.student_id,
                    "role": user.role,
                    "is_email_verified": user.is_email_verified,
                },
            },
            status=status.HTTP_200_OK,
        )


class LoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

class CoreTeamMemberCreateView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        email = request.data.get("email", "").strip().lower()
        core_team = request.data.get("core_team")

        valid_teams = [
            choice[0] for choice in CoreTeam.choices
        ]

        if not email or not core_team:
            return Response(
                {"detail": "Email and core_team are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if core_team not in valid_teams:
            return Response(
                {"detail": "Invalid core team."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "No account exists for this email. "
                        "Ask the member to register first."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if not user.is_email_verified:
            return Response(
                {"detail": "The member must verify their email first."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.role = User.Role.CORE_TEAM
        user.core_team = core_team
        user.save(update_fields=["role", "core_team"])

        return Response(
            {
                "message": "Core team assignment successful.",
                "user": CoreTeamMemberSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )

class CoreTeamMemberListView(generics.ListAPIView):
    serializer_class = CoreTeamMemberSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        queryset = User.objects.filter(role=User.Role.CORE_TEAM)

        core_team = self.request.query_params.get("core_team")

        if core_team:
            queryset = queryset.filter(core_team=core_team)

        return queryset.order_by("full_name")
    

class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        return Response(self.get_serializer(request.user).data)

    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            request.user,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)




# class ResendVerificationEmailView(APIView):
#     permission_classes = [AllowAny]
#     authentication_classes = []

#     def post(self, request):
#         email = request.data.get("email", "").strip().lower()

#         if not email:
#             return Response(
#                 {"detail": "Email is required."},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         try:
#             user = User.objects.get(email__iexact=email)
#         except User.DoesNotExist:
#             # Avoid revealing whether an email is registered.
#             return Response(
#                 {
#                     "message": (
#                         "If an eligible account exists, "
#                         "a verification email will be sent."
#                     )
#                 },
#                 status=status.HTTP_200_OK,
#             )

#         if user.is_email_verified:
#             return Response(
#                 {
#                     "message": (
#                         "If an eligible account exists, "
#                         "a verification email will be sent."
#                     )
#                 },
#                 status=status.HTTP_200_OK,
#             )

#         if user.role != User.Role.CLUB_MEMBER:
#             return Response(
#                 {
#                     "message": (
#                         "If an eligible account exists, "
#                         "a verification email will be sent."
#                     )
#                 },
#                 status=status.HTTP_200_OK,
#             )

#         try:
#             send_verification_email(user)
#         except Exception:
#             return Response(
#                 {"detail": "Unable to send the email. Please try again later."},
#                 status=status.HTTP_503_SERVICE_UNAVAILABLE,
#             )

#         return Response(
#             {
#                 "message": (
#                     "If an eligible account exists, "
#                     "a verification email will be sent."
#                 )
#             },
#             status=status.HTTP_200_OK,
#         )

class ResendVerificationEmailView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get("email", "").strip().lower()

        if not email:
            return Response(
                {"detail": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        generic_message = {
            "message": (
                "If a pending registration exists, "
                "a verification email will be sent."
            )
        }

        pending = PendingRegistration.objects.filter(
            email__iexact=email
        ).first()

        if not pending:
            return Response(
                generic_message,
                status=status.HTTP_200_OK,
            )

        if pending.is_expired():
            pending.delete()
            return Response(
                {
                    "detail": (
                        "Your pending registration has expired. "
                        "Please register again."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            send_verification_email(pending)
        except Exception:
            return Response(
                {
                    "detail": (
                        "Unable to send the email. "
                        "Please try again later."
                    )
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return Response(
            generic_message,
            status=status.HTTP_200_OK,
        )

class MyApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        application = MemberApplication.objects.filter(
            student=request.user
        ).first()

        if not application:
            return Response(
                {
                    "has_application": False,
                    "message": "You have not submitted your application yet.",
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "has_application": True,
                "application": MemberApplicationSerializer(application).data,
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        if MemberApplication.objects.filter(student=request.user).exists():
            return Response(
                {
                    "detail": (
                        "You have already submitted an application. "
                        "Use PATCH to update it."
                    )
                },
                status=status.HTTP_409_CONFLICT,
            )

        serializer = MemberApplicationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        application = serializer.save(student=request.user)

        return Response(
            {
                "message": "Application submitted successfully.",
                "application": MemberApplicationSerializer(application).data,
            },
            status=status.HTTP_201_CREATED,
        )

    def patch(self, request):
        try:
            application = MemberApplication.objects.get(
                student=request.user
            )
        except MemberApplication.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "You have not submitted an application yet. "
                        "Use POST to create one."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = MemberApplicationSerializer(
            application,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "message": "Application updated successfully.",
                "application": serializer.data,
            },
            status=status.HTTP_200_OK,
        )