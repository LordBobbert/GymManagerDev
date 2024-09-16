# user_management/views/client_views.py

from rest_framework import viewsets
from user_management.models import ClientProfile
from user_management.serializers import ClientProfileSerializer
from user_management.permissions import IsAdminOrTrainer

from rest_framework.permissions import IsAuthenticated

class ClientProfileViewSet(viewsets.ModelViewSet):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer

    def get_permissions(self):
        # Apply IsAuthenticated for all actions, ensuring the user is authenticated first
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated, IsAdminOrTrainer]
        else:
            permission_classes = [IsAuthenticated, IsAdminOrTrainer]
        return [permission() for permission in permission_classes]

