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


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from user_management.utils import set_jwt_cookies
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is not None:
            try:
                # Create refresh token for the user
                refresh = RefreshToken.for_user(user)

                # Create a response with tokens and set cookies
                response = Response({
                    'message': 'Login successful',
                    'user': {
                        'username': user.username,
                        'roles': [role.name for role in user.roles.all()],
                    },
                })

                # Set JWT cookies
                response = set_jwt_cookies(response, refresh)

                return response
            except Exception as e:
                # Log error in the case of failure
                print(f"Error during token generation or response: {e}")
                return Response({'error': 'Token generation failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Log failed login attempts
        print(f"Invalid login attempt for user: {username}")
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

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        # Serialize the current user and return the data
        user_serializer = UserSerializer(request.user)
        return Response(user_serializer.data)