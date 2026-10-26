
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import MemberApplication,PendingRegistration
User = get_user_model()


class RegisterSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    department = serializers.CharField(max_length=100)

    year_of_study = serializers.IntegerField(
        required=False,
        allow_null=True,
    )

    phone = serializers.CharField(
        max_length=15,
        required=False,
        allow_blank=True,
    )

    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"},
    )

    confirm_password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
    )

    def validate_email(self, value):
        value = value.strip().lower()

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )

        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password": "Passwords do not match."
            })

        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        raw_password = validated_data.pop("password")

        # Remove any older pending registration for this email.
        PendingRegistration.objects.filter(
            email__iexact=validated_data["email"]
        ).delete()

        # Hash the password before storing it temporarily.
        temporary_user = User(
            email=validated_data["email"],
        )
        temporary_user.set_password(raw_password)

        pending = PendingRegistration.objects.create(
            **validated_data,
            password=temporary_user.password,
        )

        return pending

# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(
#         write_only=True,
#         min_length=8,
#         style={"input_type": "password"},
#     )
#     confirm_password = serializers.CharField(
#         write_only=True,
#         style={"input_type": "password"},
#     )

#     class Meta:
#         model = User
#         fields = [
#             "id",
#             "full_name",
#             "email",
#             "student_id",
#             "department",
#             "year_of_study",
#             "phone",
#             "password",
#             "confirm_password",
#         ]
#         read_only_fields = ["id", "student_id"]

#     def validate_email(self, value):
#         value = value.strip().lower()
#         if User.objects.filter(email__iexact=value).exists():
#             raise serializers.ValidationError(
#                 "An account with this email already exists."
#             )
#         return value

#     def validate(self, attrs):
#         if attrs["password"] != attrs["confirm_password"]:
#             raise serializers.ValidationError({
#                 "confirm_password": "Passwords do not match."
#             })
#         return attrs

#     def create(self, validated_data):
#         validated_data.pop("confirm_password")

#         user = User.objects.create_user(
#             **validated_data,
#             role=User.Role.CLUB_MEMBER,
#             is_active=True,
#             is_email_verified=False,
#         )
#         return user



class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):

    username_field = "email"

    def validate(self, attrs):
        attrs["email"] = attrs.get("email", "").strip().lower()

        data = super().validate(attrs)

        user = self.user

        if user.role == user.Role.CLUB_MEMBER and not user.is_email_verified:
            raise serializers.ValidationError(
                "Please verify your email before logging in."
            )

        data["user"] = {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "student_id": user.student_id,
            "role": user.role,
            "is_email_verified": user.is_email_verified,
        }

        return data



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "student_id",
            "department",
            "year_of_study",
            "phone",
            "profile_picture",
            "role",
            "is_email_verified",
        ]
        read_only_fields = [
            "id",
            "email",
            "student_id",
            "role",
            "is_email_verified",
        ]


class CoreTeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "student_id",
            "department",
            "year_of_study",
            "phone",
            "role",
            "core_team",
            "is_email_verified",
        ]
        read_only_fields = [
            "id",
            "student_id",
            "role",
            "is_email_verified",
        ]



class MemberApplicationSerializer(serializers.ModelSerializer):
    student_id = serializers.CharField(
        source="student.student_id",
        read_only=True,
    )

    class Meta:
        model = MemberApplication
        fields = [
            "id",
            "student_id",
            "reason_to_join",
            "areas_of_interest",
            "skills",
            "github_url",
            "linkedin_url",
            "preferred_team",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "student_id",
            "created_at",
            "updated_at",
        ]

    def validate_github_url(self, value):
        if value and "github.com" not in value.lower():
            raise serializers.ValidationError(
                "Please enter a valid GitHub profile URL."
            )
        return value

    def validate_linkedin_url(self, value):
        if value and "linkedin.com" not in value.lower():
            raise serializers.ValidationError(
                "Please enter a valid LinkedIn profile URL."
            )
        return value