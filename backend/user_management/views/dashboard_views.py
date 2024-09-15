from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from user_management.models import TrainerProfile, ClientProfile
from user_management.serializers import ClientProfileSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    if request.user.role != 'admin':
        return Response({'detail': 'Access denied'}, status=403)
    return Response({'message': 'Welcome to the admin dashboard!'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trainer_dashboard(request):
    if request.user.role != 'trainer':
        return Response({'detail': 'You are not authorized to view this page.'}, status=403)

    trainer_profile = get_object_or_404(TrainerProfile, user=request.user)
    clients = trainer_profile.clients.all()
    serializer = ClientProfileSerializer(clients, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def client_dashboard(request):
    if request.user.role != 'client':
        return Response({'detail': 'You are not authorized to view this page.'}, status=403)

    client_profile = get_object_or_404(ClientProfile, user=request.user)
    serializer = ClientProfileSerializer(client_profile)
    return Response(serializer.data)
