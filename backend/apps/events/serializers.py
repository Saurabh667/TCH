
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Event,EventRegistration,EventOrganizer,EventImage

User = get_user_model()
class EventSerializer(serializers.ModelSerializer):

    created_by_name = serializers.CharField(
        source="created_by.full_name",
        read_only=True
    )

    class Meta:
        model = Event

        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "description",
            "banner",
            "category",
            "mode",
            "venue",
            "meeting_link",
            "start_date",
            "end_date",
            "registration_start",
            "registration_end",
            "registration_required",
            "max_participants",
            "registration_fee",
            "eligibility",
            "rules",
            "prerequisites",
            "contact_person",
            "contact_email",
            "is_featured",
            "status",
            "created_by",
            "created_by_name",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "slug",
            "created_by",
            "created_by_name",
            "created_at",
            "updated_at",
        ]

    def validate(self, attrs):

        start_date = attrs.get(
            "start_date",
            getattr(self.instance, "start_date", None)
        )

        end_date = attrs.get(
            "end_date",
            getattr(self.instance, "end_date", None)
        )

        registration_start = attrs.get(
            "registration_start",
            getattr(self.instance, "registration_start", None)
        )

        registration_end = attrs.get(
            "registration_end",
            getattr(self.instance, "registration_end", None)
        )

        mode = attrs.get(
            "mode",
            getattr(self.instance, "mode", None)
        )

        venue = attrs.get(
            "venue",
            getattr(self.instance, "venue", "")
        )

        meeting_link = attrs.get(
            "meeting_link",
            getattr(self.instance, "meeting_link", "")
        )

        if start_date and end_date and end_date <= start_date:
            raise serializers.ValidationError({
                "end_date": "Event end date must be after start date."
            })

        if registration_start and registration_end:
            if registration_end < registration_start:
                raise serializers.ValidationError({
                    "registration_end": "Registration end must be after registration start."
                })

        if start_date and registration_end:
            if registration_end > start_date:
                raise serializers.ValidationError({
                    "registration_end": "Registration must close before the event starts."
                })

        if mode == "offline" and not venue:
            raise serializers.ValidationError({
                "venue": "Venue is required for offline events."
            })

        if mode == "online" and not meeting_link:
            raise serializers.ValidationError({
                "meeting_link": "Meeting link is required for online events."
            })

        return attrs


class EventRegistrationSerializer(serializers.ModelSerializer):

    event_title = serializers.CharField(
        source="event.title",
        read_only=True
    )

    event_slug = serializers.CharField(
        source="event.slug",
        read_only=True
    )

    user_name = serializers.CharField(
        source="user.full_name",
        read_only=True
    )

    user_email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:
        model = EventRegistration

        fields = [
            "id",
            "event",
            "event_title",
            "event_slug",
            "user",
            "user_name",
            "user_email",
            "registration_date",
            "status",
            "attendance_status",
            "attended_at",
            "certificate_issued",
        ]

        read_only_fields = fields


class EventOrganizerSerializer(serializers.ModelSerializer):

    member_name = serializers.CharField(
        source="member.full_name",
        read_only=True
    )

    member_email = serializers.EmailField(
        source="member.email",
        read_only=True
    )

    member_team = serializers.CharField(
        source="member.core_team",
        read_only=True,
        allow_null=True
    )

    assigned_by_name = serializers.CharField(
        source="assigned_by.full_name",
        read_only=True,
        allow_null=True
    )

    class Meta:

        model = EventOrganizer

        fields = [
            "id",
            "event",
            "member",
            "member_name",
            "member_email",
            "member_team",
            "responsibility",
            "assigned_by",
            "assigned_by_name",
            "assigned_at",
        ]

        read_only_fields = [
            "id",
            "event",
            "assigned_by",
            "assigned_by_name",
            "assigned_at",
        ]

    def validate_member(self, value):

        if value.role != "core_team":
            raise serializers.ValidationError(
                "Only Core Team members can be assigned as organizers."
            )

        return value

    def validate(self, attrs):

        event = self.context.get("event")

        member = attrs.get(
            "member",
            getattr(self.instance, "member", None)
        )

        if event and member:

            existing = EventOrganizer.objects.filter(
                event=event,
                member=member
            )

            if self.instance:
                existing = existing.exclude(
                    pk=self.instance.pk
                )

            if existing.exists():
                raise serializers.ValidationError({
                    "member": "This member is already assigned to this event."
                })

        return attrs


class AttendanceSerializer(serializers.ModelSerializer):

    user_name = serializers.CharField(
        source="user.full_name",
        read_only=True
    )

    user_email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:
        model = EventRegistration

        fields = [
            "id",
            "user",
            "user_name",
            "user_email",
            "status",
            "attendance_status",
            "attended_at",
        ]

        read_only_fields = [
            "id",
            "user",
            "user_name",
            "user_email",
            "status",
            "attended_at",
        ]





class EventImageSerializer(serializers.ModelSerializer):

    uploaded_by_name = serializers.CharField(
        source="uploaded_by.full_name",
        read_only=True,
        allow_null=True
    )

    class Meta:
        model = EventImage

        fields = [
            "id",
            "event",
            "image",
            "caption",
            "uploaded_by",
            "uploaded_by_name",
            "uploaded_at",
        ]

        read_only_fields = [
            "id",
            "event",
            "uploaded_by",
            "uploaded_by_name",
            "uploaded_at",
        ]

    def validate_image(self, value):

        max_size = 10 * 1024 * 1024  # 10 MB

        if value.size > max_size:
            raise serializers.ValidationError(
                "Image size cannot exceed 5 MB."
            )

        allowed_types = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ]

        content_type = getattr(value, "content_type", None)

        if content_type not in allowed_types:
            raise serializers.ValidationError(
                "Only JPG, PNG and WEBP images are allowed."
            )

        return value