from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.core.validators import MinValueValidator
from django.db.models import Q


class Event(models.Model):

    class Category(models.TextChoices):
        WORKSHOP = "workshop", "Workshop"
        HACKATHON = "hackathon", "Hackathon"
        SEMINAR = "seminar", "Seminar"
        WEBINAR = "webinar", "Webinar"
        COMPETITION = "competition", "Competition"
        TECH_TALK = "tech_talk", "Tech Talk"
        BOOTCAMP = "bootcamp", "Bootcamp"
        OTHER = "other", "Other"

    class Mode(models.TextChoices):
        ONLINE = "online", "Online"
        OFFLINE = "offline", "Offline"
        HYBRID = "hybrid", "Hybrid"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        CANCELLED = "cancelled", "Cancelled"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)

    short_description = models.CharField(max_length=300)
    description = models.TextField()

    banner = models.ImageField(
        upload_to="events/banners/",
        null=True,
        blank=True
    )

    category = models.CharField(
        max_length=30,
        choices=Category.choices,
        default=Category.OTHER
    )

    mode = models.CharField(
        max_length=20,
        choices=Mode.choices,
        default=Mode.OFFLINE
    )

    venue = models.CharField(max_length=255, blank=True)
    meeting_link = models.URLField(blank=True)

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    registration_start = models.DateTimeField(null=True, blank=True)
    registration_end = models.DateTimeField(null=True, blank=True)

    registration_required = models.BooleanField(default=True)

    max_participants = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    registration_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        validators=[MinValueValidator(0)]
    )

    eligibility = models.TextField(blank=True)
    rules = models.TextField(blank=True)
    prerequisites = models.TextField(blank=True)

    contact_person = models.CharField(max_length=150, blank=True)
    contact_email = models.EmailField(blank=True)

    is_featured = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="created_events"
    )
    reminder_sent_at = models.DateTimeField(
    null=True,
    blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

        indexes = [
            models.Index(fields=["status", "start_date"]),
            models.Index(fields=["category"]),
        ]

        constraints = [
            models.CheckConstraint(
                condition=Q(end_date__gt=models.F("start_date")),
                name="event_end_after_start"
            ),
            models.CheckConstraint(
                condition=(
                    Q(registration_start__isnull=True)
                    | Q(registration_end__isnull=True)
                    | Q(registration_end__gte=models.F("registration_start"))
                ),
                name="valid_registration_period"
            ),
        ]

    def save(self, *args, **kwargs):

        if not self.slug:
            base_slug = slugify(self.title) or "event"
            slug = base_slug
            counter = 1

            while Event.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                counter += 1
                slug = f"{base_slug}-{counter}"

            self.slug = slug

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    @property
    def is_upcoming(self):
        from django.utils import timezone
        return self.start_date > timezone.now()

    @property
    def is_completed(self):
        from django.utils import timezone
        return self.end_date < timezone.now()



class EventRegistration(models.Model):

    class RegistrationStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        CONFIRMED = "confirmed", "Confirmed"
        REJECTED = "rejected", "Rejected"
        CANCELLED = "cancelled", "Cancelled"

    class AttendanceStatus(models.TextChoices):
        NOT_MARKED = "not_marked", "Not Marked"
        PRESENT = "present", "Present"
        ABSENT = "absent", "Absent"

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="registrations"
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="event_registrations"
    )

    registration_date = models.DateTimeField(auto_now_add=True)

    status = models.CharField(
        max_length=20,
        choices=RegistrationStatus.choices,
        default=RegistrationStatus.CONFIRMED
    )

    attendance_status = models.CharField(
        max_length=20,
        choices=AttendanceStatus.choices,
        default=AttendanceStatus.NOT_MARKED
    )
    reminder_sent_at = models.DateTimeField(
        null=True,
        blank=True
    )

    attended_at = models.DateTimeField(null=True, blank=True)

    certificate_issued = models.BooleanField(default=False)

    class Meta:
        ordering = ["-registration_date"]

        constraints = [
            models.UniqueConstraint(
                fields=["event", "user"],
                name="unique_event_registration"
            )
        ]

        indexes = [
            models.Index(fields=["event", "status"]),
            models.Index(fields=["user", "status"]),
        ]

    def __str__(self):
        return f"{self.user} - {self.event}"



class EventOrganizer(models.Model):

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="organizers"
    )

    member = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="organized_events"
    )

    responsibility = models.CharField(max_length=150)

    assigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="organizer_assignments"
    )

    assigned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["event", "member"],
                name="unique_event_organizer"
            )
        ]

    def __str__(self):
        return f"{self.member} - {self.event}"


class EventImage(models.Model):

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(
        upload_to="events/gallery/"
    )

    caption = models.CharField(max_length=255, blank=True)

    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="uploaded_event_images"
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return f"Image - {self.event.title}"