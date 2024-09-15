# user_management/views/client_views.py

from rest_framework import viewsets
from user_management.models import ClientProfile
from user_management.serializers import ClientProfileSerializer
from user_management.permissions import IsAdminOrTrainer

class ClientProfileViewSet(viewsets.ModelViewSet):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminOrTrainer]
        else:
            permission_classes = [IsAdminOrTrainer]
        return [permission() for permission in permission_classes]
