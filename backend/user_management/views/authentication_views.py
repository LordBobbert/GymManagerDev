from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from user_management.utils import set_jwt_cookies
from user_management.serializers import UserSerializer
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import TokenError
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from user_management.models import User
from user_management.permissions import IsAdmin, IsAdminOrTrainer
from user_management.serializers import UserSerializer


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is not None:
            # Create a refresh token for the user
            refresh = RefreshToken.for_user(user)

            # Get the user's roles as a list
            user_roles = [role.name for role in user.roles.all()]

            # Create the response without including tokens in the response body
            response = Response({
                'message': 'Login successful',
                'user': {
                    'username': user.username,
                    'roles': user_roles,  # Include the user roles here
                },
            })

            # Set JWT cookies in the response
            set_jwt_cookies(response, refresh)

            # Optionally include the CSRF token in the response if needed
            response['X-CSRFToken'] = get_token(request)

            return response

        # If authentication fails, return an error response
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                response = Response()
                set_jwt_cookies(response, refresh)
                return response
            except TokenError:
                return Response({'error': 'Refresh token expired or invalid'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'error': 'No refresh token found'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            pass
        response = Response()
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        response.data = {'message': 'Logged out successfully'}
        return response
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAdmin]
        elif self.action in ['create']:
            permission_classes = [IsAdminOrTrainer]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
