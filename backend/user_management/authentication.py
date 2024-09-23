# File: user_management/authentication.py

from rest_framework_simplejwt.authentication import JWTAuthentication

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Try to get the token from the 'access_token' cookie
        raw_token = request.COOKIES.get('access_token')

        if raw_token is None:
            # Fallback to the Authorization header (Bearer token)
            header = self.get_header(request)
            raw_token = self.get_raw_token(header)

        if raw_token is None:
            return None

        return self.get_user_and_token(raw_token)
