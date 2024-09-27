from rest_framework import viewsets
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView, UpdateAPIView
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from user_management.models import User, ClientProfile, TrainerProfile
from user_management.serializers import UserSerializer
from user_management.serializers.client_serializers import ClientProfileSerializer
from user_management.serializers.trainer_serializers import TrainerProfileSerializer
from user_management.permissions import IsAdmin, IsAdminOrTrainer


@api_view(['GET'])
@permission_classes([IsAdmin])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


class UserDetailView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def get_object(self):
        return get_object_or_404(User, pk=self.kwargs['pk'])


class CreateClientView(CreateAPIView):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer
    permission_classes = [IsAdmin]

    def perform_create(self, serializer):
        serializer.save()


class CreateTrainerView(CreateAPIView):
    queryset = TrainerProfile.objects.all()
    serializer_class = TrainerProfileSerializer
    permission_classes = [IsAdmin]

    def perform_create(self, serializer):
        serializer.save()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'clients']:  # Add 'clients' to the action list
            permission_classes = [IsAdmin]
        elif self.action in ['create']:
            permission_classes = [IsAdminOrTrainer]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'], url_path='clients', url_name='clients')
    def clients(self, request):
        """
        Custom action to list all clients.
        """
        queryset = ClientProfile.objects.all()
        serializer = ClientProfileSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='trainers')
    def trainers(self, request):
        # Filter users who have the 'trainer' role
        trainers = User.objects.filter(roles__name='trainer')
        serializer = self.get_serializer(trainers, many=True)
        return Response(serializer.data)

class ClientUpdateView(UpdateAPIView):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated, IsAdmin]  # Only admins can update clients
    http_method_names = ['patch']  # Allow only PATCH requests

