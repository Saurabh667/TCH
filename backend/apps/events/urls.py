from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    EventViewSet,
    EventRegistrationView,
    MyEventRegistrationsView,
    CancelEventRegistrationView,
    EventParticipantsView,
    ManageRegistrationStatusView,
    EventOrganizerListCreateView,
    EventOrganizerDetailView,
    EventAttendanceView,
    MarkAttendanceView,
    BulkAttendanceView,
    MyEventAttendanceView,
    EventGalleryView,
    EventGalleryDetailView,
    EventBannerView,
)
from .analytics import EventAnalyticsView,EventWiseAnalyticsView,GlobalAnalyticsExportView,EventAnalyticsExportView

router = DefaultRouter()

router.register(
    r"",
    EventViewSet,
    basename="events"
)

urlpatterns = [

    path(
        "my-registrations/",
        MyEventRegistrationsView.as_view(),
        name="my-registrations"
    ),

    path(
        "<int:event_id>/register/",
        EventRegistrationView.as_view(),
        name="event-register"
    ),

    path(
        "<int:event_id>/cancel-registration/",
        CancelEventRegistrationView.as_view(),
        name="cancel-registration"
    ),

    path(
        "<int:event_id>/participants/",
        EventParticipantsView.as_view(),
        name="event-participants"
    ),

    path(
        "registrations/<int:registration_id>/status/",
        ManageRegistrationStatusView.as_view(),
        name="manage-registration-status"
    ),
    path(
    "<int:event_id>/organizers/",
    EventOrganizerListCreateView.as_view(),
    name="event-organizers"
    ),

    path(
        "organizers/<int:organizer_id>/",
        EventOrganizerDetailView.as_view(),
        name="event-organizer-detail"
    ),

    path(
        "my-attendance/",
        MyEventAttendanceView.as_view(),
        name="my-event-attendance"
    ),

    path(
        "<int:event_id>/attendance/",
        EventAttendanceView.as_view(),
        name="event-attendance"
    ),

    path(
        "attendance/<int:registration_id>/",
        MarkAttendanceView.as_view(),
        name="mark-attendance"
    ),

    path(
        "<int:event_id>/attendance/bulk/",
        BulkAttendanceView.as_view(),
        name="bulk-attendance"
    ),


    # Event Gallery

    path(
        "<int:event_id>/gallery/",
        EventGalleryView.as_view(),
        name="event-gallery"
    ),

    path(
        "gallery/<int:image_id>/",
        EventGalleryDetailView.as_view(),
        name="event-gallery-detail"
    ),

    # Event Banner

    path(
        "<int:event_id>/banner/",
        EventBannerView.as_view(),
        name="event-banner"
    ),

    path(
    "analytics/",
    EventAnalyticsView.as_view(),
    name="event-analytics"
    ),
    path(
    "<int:event_id>/analytics/",
    EventWiseAnalyticsView.as_view(),
    name="event-wise-analytics"
    ),
    path(
        "analytics/export/",
        GlobalAnalyticsExportView.as_view(),
        name="global-analytics-export"
    ),
    
    path(
        "<int:event_id>/analytics/export/",
        EventAnalyticsExportView.as_view(),
        name="event-analytics-export"
    ),
    path("", include(router.urls)),
]