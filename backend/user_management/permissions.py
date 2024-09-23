from rest_framework.permissions import BasePermission

class IsAdminOrTrainer(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False
        
        # Now check the user's roles
        return request.user.roles.filter(name__in=['admin', 'trainer']).exists()
    
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and if the user has any roles
        if not request.user.is_authenticated or not request.user.roles.exists():
            return False
        # Check if the user has the 'admin' role
        return request.user.roles.filter(name='admin').exists()

