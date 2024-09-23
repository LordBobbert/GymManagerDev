# utils.py

from datetime import timedelta
from django.conf import settings

def set_jwt_cookies(response, refresh):
    # Access token settings
    response.set_cookie(
        key='access_token',
        value=str(refresh.access_token),
        httponly=True,
        secure=True,  # Set to True if using HTTPS
        samesite='None',
        max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(),  # Set expiration time
        path='/',
    )

    # Refresh token settings
    response.set_cookie(
        key='refresh_token',
        value=str(refresh),
        httponly=True,
        secure=True,  # Set to True if using HTTPS
        samesite='None',
        max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds(),  # Set expiration time
        path='/',
    )

    return response
