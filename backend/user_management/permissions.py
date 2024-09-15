from rest_framework.permissions import BasePermission

class IsAdminOrTrainer(BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the 'admin' or 'trainer' role
        return request.user.roles.filter(name__in=['admin', 'trainer']).exists()

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the 'admin' role
        return request.user.roles.filter(name='admin').exists()
