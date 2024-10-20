from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from user_management.models import User
from serializers import UserSerializer
from .permissions import IsAdmin, IsTrainer  # Assuming you have custom permissions defined

# Function-based view to handle listing users by role
@api_view(['GET'])
@permission_classes([IsAdmin])
def user_list(request):
    """
    API view to list users, filtered by role if provided in the query params.
    """
    role = request.query_params.get('role', None)
    
    # Filter users by role
    if role == 'client':
        users = User.objects.filter(roles__name='client')  # Adjust this to match your actual role field
    elif role == 'trainer':
        users = User.objects.filter(roles__name='trainer')  # Adjust this to match your actual role field
    else:
        users = User.objects.all()

    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# Class-based viewset to handle user CRUD operations and custom role-based actions
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin | IsTrainer]  # Example permissions
    filter_backends = [DjangoFilterBackend]

    @action(detail=False, methods=['get'], url_path='clients', url_name='clients')
    def clients(self, request):
        """
        Custom action to list all clients.
        """
        # Assuming the roles are stored in a related field
        clients = User.objects.filter(roles__name='client').distinct()
        serializer = self.get_serializer(clients, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='trainers', url_name='trainers')
    def trainers(self, request):
        """
        Custom action to list all trainers.
        """
        # Assuming the roles are stored in a related field
        trainers = User.objects.filter(roles__name='trainer').distinct()
        serializer = self.get_serializer(trainers, many=True)
        return Response(serializer.data)

    # Optionally, you can override `get_queryset` if you want to use filtering differently
    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get('role', None)
        
        if role:
            # Filter by role if role query param is present
            queryset = queryset.filter(roles__name=role)
        
        return queryset
