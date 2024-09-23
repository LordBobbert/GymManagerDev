# File: authentication_views.py

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from user_management.utils import set_jwt_cookies
from user_management.serializers import UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenRefreshView

class LoginView(APIView):
    """
    View for handling user login and setting JWT tokens in cookies.
    """
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is not None:
            if not user.is_active:
                # Log inactive user attempts
                print(f"User {username} is inactive.")
                return Response({'error': 'User is inactive'}, status=status.HTTP_401_UNAUTHORIZED)

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

                # Set JWT cookies for access and refresh tokens
                response = set_jwt_cookies(response, refresh)

                return response
            except Exception as e:
                # Log errors during token generation
                print(f"Error during token generation or response: {e}")
                return Response({'error': 'Token generation failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Log failed login attempts
        print(f"Invalid login attempt for user: {username}")
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class CookieTokenRefreshView(TokenRefreshView):
    """
    View for handling refresh token and setting new access and refresh tokens in cookies.
    """
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                response = Response()
                set_jwt_cookies(response, refresh)  # Re-set cookies with the new tokens
                return response
            except TokenError:
                # Delete cookies if refresh token is expired or invalid
                response = Response({'error': 'Refresh token expired or invalid'}, status=status.HTTP_401_UNAUTHORIZED)
                response.delete_cookie('access_token')
                response.delete_cookie('refresh_token')
                return response
        return Response({'error': 'No refresh token found'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """
    View to handle user logout and clearing of JWT tokens from cookies.
    """
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist the refresh token
            else:
                print("No refresh token found in cookies.")
        except Exception as e:
            print(f"Error during logout: {e}")

        # Clear the access and refresh token cookies
        response = Response({'message': 'Logged out successfully'})
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response


class CurrentUserView(APIView):
    """
    View for fetching the current authenticated user's data.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_serializer = UserSerializer(request.user)
        return Response(user_serializer.data)


# Custom JWT Authentication class that retrieves tokens from cookies or the Authorization header
class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Try to get the token from the 'access_token' cookie
        raw_token = request.COOKIES.get('access_token')

        if raw_token is None:
            # Fallback to the Authorization header (Bearer token)
            header = self.get_header(request)
            raw_token = self.get_raw_token(header)

        if raw_token is None:
            print("No JWT token found in request")
            return None

        try:
            return self.get_user_and_token(raw_token)
        except TokenError as e:
            print(f"Invalid token: {e}")
            return None
