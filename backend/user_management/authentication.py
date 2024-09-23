from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # First, try to get the token from the 'access_token' cookie
        raw_token = request.COOKIES.get('access_token')

        if raw_token is None:
            # Fallback to the Authorization header (Bearer token)
            header = self.get_header(request)
            if header is None:  # No header is provided
                return None  # No token found, authentication fails
            raw_token = self.get_raw_token(header)

        if raw_token is None:
            return None  # No token found, authentication fails

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token
