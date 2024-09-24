# user_management/authentication.py
from rest_framework_simplejwt.authentication import JWTAuthentication

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Extract the token from cookies
        access_token = request.COOKIES.get('access_token')
        
        if access_token is None:
            return None  # No access token in cookies
        
        # Validate and authenticate using the JWT token
        validated_token = self.get_validated_token(access_token)
        return self.get_user(validated_token), validated_token
