# user_management/views/trainer_views.py

from rest_framework import viewsets
from user_management.models import TrainerProfile
from user_management.serializers import TrainerProfileSerializer
from user_management.permissions import IsAdmin

class TrainerProfileViewSet(viewsets.ModelViewSet):
    queryset = TrainerProfile.objects.all()
    serializer_class = TrainerProfileSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]
