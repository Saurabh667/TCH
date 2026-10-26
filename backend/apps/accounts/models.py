
from django.db import models,transaction
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import RegexValidator
from django.utils import timezone 
from datetime import timedelta 
import uuid

class UserManager(BaseUserManager):
    """
    Custom manager that uses email instead of username.
    """

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("An email address is required.")

        email = self.normalize_email(email).lower()
        user = self.model(email=email, **extra_fields)

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("role", User.Role.ADMIN)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_email_verified", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("A superuser must have is_staff=True.")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("A superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class ClubMemberSequence(models.Model):
    """
    Maintains the sequence used to generate club member IDs.
    """

    last_number = models.PositiveBigIntegerField(default=0)

    def __str__(self):
        return f"Club member sequence: {self.last_number}"
    
class CoreTeam(models.TextChoices):
    TECH = "tech", "Tech Team"
    EVENT_MANAGEMENT = "event_management", "Event Management Team"
    CONTENT_CREATION = "content_creation", "Content Creation Team"

class User(AbstractUser):
    """
    Custom user model for the CSE Club Management System.
    """
    def save(self, *args, **kwargs):
        if not self.student_id:
            with transaction.atomic():
                sequence, _ = ClubMemberSequence.objects.select_for_update().get_or_create(
                    pk=1
                )

                sequence.last_number += 1
                sequence.save(update_fields=["last_number"])

                self.student_id = f"CLUB{sequence.last_number:06d}"

                super().save(*args, **kwargs)
        else:
            super().save(*args, **kwargs)
    class Role(models.TextChoices):
        CLUB_MEMBER = "club_member", "Club Member"
        CORE_TEAM = "core_team", "Core Team"
        ADMIN = "admin", "Admin"

    username = None

    email = models.EmailField(unique=True)

    full_name = models.CharField(max_length=150)

    student_id = models.CharField(
        max_length=20,
        unique=True,
        blank=True,
        editable=False,
    )

    department = models.CharField(max_length=100)

    year_of_study = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
    )

    phone = models.CharField(
        max_length=15,
        blank=True,
        validators=[
            RegexValidator(
                regex=r"^\+?[0-9]{7,15}$",
                message="Enter a valid phone number.",
            )
        ],
    )

    profile_picture = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True,
    )

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.CLUB_MEMBER,
    )
    core_team = models.CharField(
    max_length=30,
    choices=CoreTeam.choices,
    null=True,
    blank=True,
    )

    is_email_verified = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "department"]

    def __str__(self):
        return self.email


class MemberApplication(models.Model):

    class PreferredTeam(models.TextChoices):
        TECH = "tech", "Tech Team"
        EVENT_MANAGEMENT = "event_management", "Event Management Team"
        CONTENT_CREATION = "content_creation", "Content Creation Team"
        UNDECIDED = "undecided", "Not Decided Yet"

    student = models.OneToOneField(
        User,
        to_field="student_id",
        db_column="student_id",
        on_delete=models.CASCADE,
        related_name="application",
    )

    reason_to_join = models.TextField(
        blank=True,
    )

    areas_of_interest = models.JSONField(
        default=list,
        blank=True,
    )

    skills = models.JSONField(
        default=list,
        blank=True,
    )

    github_url = models.URLField(
        max_length=255,
        blank=True,
    )

    linkedin_url = models.URLField(
        max_length=255,
        blank=True,
    )

    preferred_team = models.CharField(
        max_length=30,
        choices=PreferredTeam.choices,
        blank=True,
        default="",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Application - {self.student.student_id}"




class PendingRegistration(models.Model): 
    full_name = models.CharField(max_length=150) 
    email = models.EmailField(unique=True) 
    department = models.CharField(max_length=100) 
    year_of_study = models.PositiveSmallIntegerField( null=True, blank=True, ) 
    phone = models.CharField(max_length=15, blank=True) # Password will be stored as a Django password hash. 
    password = models.CharField(max_length=128) 
    token = models.UUIDField( default=uuid.uuid4, unique=True, editable=False, ) 
    created_at = models.DateTimeField(auto_now_add=True) 
    def is_expired(self): 
        return timezone.now() > self.created_at + timedelta(hours=24) 
    def __str__(self): 
        return self.email