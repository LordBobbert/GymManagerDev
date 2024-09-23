# user_management/views/client_views.py

from rest_framework import viewsets
from user_management.models import ClientProfile
from user_management.serializers import ClientProfileSerializer
from user_management.permissions import IsAdmin

from rest_framework.permissions import IsAuthenticated

class ClientProfileViewSet(viewsets.ModelViewSet):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer
    permission_classes = [IsAuthenticated, IsAdmin]


