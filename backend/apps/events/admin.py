from django.contrib import admin
from .models import (
    Event,
    EventRegistration,
    EventOrganizer,
    EventImage
)


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "category",
        "mode",
        "start_date",
        "status",
        "created_by"
    )

    list_filter = (
        "category",
        "mode",
        "status",
        "is_featured"
    )

    search_fields = (
        "title",
        "description",
        "created_by__email"
    )

    prepopulated_fields = {
        "slug": ("title",)
    }


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):

    list_display = (
        "event",
        "user",
        "status",
        "attendance_status",
        "registration_date"
    )

    list_filter = (
        "status",
        "attendance_status"
    )

    search_fields = (
        "event__title",
        "user__email"
    )


@admin.register(EventOrganizer)
class EventOrganizerAdmin(admin.ModelAdmin):

    list_display = (
        "event",
        "member",
        "responsibility",
        "assigned_at"
    )


@admin.register(EventImage)
class EventImageAdmin(admin.ModelAdmin):

    list_display = (
        "event",
        "caption",
        "uploaded_by",
        "uploaded_at"
    )