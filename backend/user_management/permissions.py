from rest_framework.permissions import BasePermission

class IsAdminOrTrainer(BasePermission):
    """
    Custom permission to check if the user is either an admin or a trainer.
    """
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False

        # Check if the user has the 'admin' or 'trainer' role
        return request.user.roles.filter(name__in=['admin', 'trainer']).exists()

class IsAdmin(BasePermission):
    """
    Custom permission to check if the user is an admin.
    """
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False

        # Check if the user has the 'admin' role
        return request.user.roles.filter(name='admin').exists()
