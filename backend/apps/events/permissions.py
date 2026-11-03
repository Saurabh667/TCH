from rest_framework.permissions import BasePermission, SAFE_METHODS


def is_admin(user):
    return (
        user.is_authenticated
        and (
            user.role == "admin"
            or user.is_superuser
        )
    )


def is_core_team(user):
    return (
        user.is_authenticated
        and user.role == "core_team"
    )


class IsAdminOrCoreTeam(BasePermission):
    """
    Only Admin and Core Team members can access.
    Used for creating and managing events.
    """

    message = "Only Admin and Core Team members can perform this action."

    def has_permission(self, request, view):
        user = request.user

        return (
            is_admin(user)
            or is_core_team(user)
        )


class CanManageEvent(BasePermission):
    """
    Admin:
        Can manage every event.

    Core Team:
        Can edit events they created or are assigned to.
        Can delete only events they created.

    Club Member:
        Can only view published events.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):

        user = request.user

        # Admin can perform every action.
        if is_admin(user):
            return True

        # Safe methods: GET, HEAD, OPTIONS
        if request.method in SAFE_METHODS:

            # Core Team can view all events.
            if is_core_team(user):
                return True

            # Club members can view published events only.
            return obj.status == "published"

        # Only Core Team can modify events.
        if not is_core_team(user):
            return False

        # Core Team can delete only events they created.
        if request.method == "DELETE":
            return obj.created_by_id == user.id

        # Core Team can edit events they created.
        if obj.created_by_id == user.id:
            return True

        # Core Team can also edit events assigned to them.
        return obj.organizers.filter(member=user).exists()


class IsClubMember(BasePermission):
    """
    Only authenticated club members can register for events.
    """

    message = "Only club members can register for events."

    def has_permission(self, request, view):

        user = request.user

        return (
            user.is_authenticated
            and user.role == "club_member"
        )


# class CanManageEventRegistrations(BasePermission):
#     """
#     Admin can manage registrations for all events.

#     Core Team can manage registrations for events
#     they created or are assigned to organize.
#     """

#     message = "You do not have permission to manage these registrations."

#     def has_object_permission(self, request, view, event):

#         user = request.user

#         if is_admin(user):
#             return True

#         if is_core_team(user):
#             return (
#                 event.created_by_id == user.id
#                 or event.organizers.filter(member=user).exists()
#             )

#         return False
class CanManageEventRegistrations(BasePermission):

    message = "You are not authorized to manage registrations."

    def has_object_permission(self, request, view, event):

        user = request.user

        return (
            is_admin(user)
            or is_core_team(user)
        )
class CanManageEvent(BasePermission):

    message = "You do not have permission to manage this event."

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):

        user = request.user

        # Admin and Core Team have complete event access.
        if is_admin(user) or is_core_team(user):
            return True

        # Club Members can only view published events.
        if request.method in SAFE_METHODS:
            return obj.status == "published"

        return False


class CanManageEventOrganizers(BasePermission):

    message = "You are not authorized to manage event organizers."

    def has_object_permission(self, request, view, event):

        user = request.user

        return (
            is_admin(user)
            or is_core_team(user)
        )



class CanManageEventAttendance(BasePermission):

    message = "You are not authorized to manage event attendance."

    def has_object_permission(self, request, view, event):

        user = request.user

        return (
            is_admin(user)
            or is_core_team(user)
        )



class CanManageEventMedia(BasePermission):
    """
    Admin and Core Team can manage media
    for any event.
    """

    message = "You are not authorized to manage event media."

    def has_object_permission(self, request, view, event):

        user = request.user

        return (
            is_admin(user)
            or is_core_team(user)
        )