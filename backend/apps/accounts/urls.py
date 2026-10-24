from django.urls import path 
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView,VerifyEmailView,LoginView,MyProfileView,ResendVerificationEmailView,CoreTeamMemberCreateView,CoreTeamMemberListView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("verify-email/", VerifyEmailView.as_view(), name="verify-email"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("me/", MyProfileView.as_view(), name="my-profile"),
    path("resend-verification/",ResendVerificationEmailView.as_view(),name="resend-verification"),

    # core team member creation
    path("core-team/",CoreTeamMemberListView.as_view(),name="core-team-list"),
    path("core-team/assign/",CoreTeamMemberCreateView.as_view(),name="core-team-assign"),
]