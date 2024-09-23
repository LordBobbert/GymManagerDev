# authentication_views.py

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from user_management.utils import set_jwt_cookies  # Ensure set_jwt_cookies is imported correctly
from django.contrib.auth import authenticate
from user_management.serializers import UserSerializer

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
                print(f"Error during token generation or response: {e}")
                return Response({'error': 'Token generation failed'}, status=500)

        print(f"Invalid login attempt for user: {username}")
        return Response({'error': 'Invalid credentials'}, status=401)


class CookieTokenRefreshView(APIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                response = Response()
                set_jwt_cookies(response, refresh)
                return response
            except TokenError:
                return Response({'error': 'Refresh token expired or invalid'}, status=401)
        return Response({'error': 'No refresh token found'}, status=400)


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            pass
        response = Response({'message': 'Logged out successfully'})
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_serializer = UserSerializer(request.user)
        return Response(user_serializer.data)
