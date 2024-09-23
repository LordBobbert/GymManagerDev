from rest_framework.permissions import BasePermission

class IsAdminOrTrainer(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False
        
        # Now check the user's roles
        return request.user.roles.filter(name__in=['admin', 'trainer']).exists()
    
from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and has the 'admin' role in their roles ManyToManyField
        return request.user.is_authenticated and request.user.roles.filter(name='admin').exists()

