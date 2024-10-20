from rest_framework.permissions import IsAuthenticated
from user_management.permissions import IsAdmin, IsAdminOrTrainer  # This line is correct

class AdminTrainerPermissionMixin:
    """
    Mixin to standardize permission classes for views that need IsAdmin or IsAdminOrTrainer.
    """
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAdmin]
        elif self.action in ['create']:
            permission_classes = [IsAdminOrTrainer]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
