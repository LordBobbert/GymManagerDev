from django.conf import settings

def set_jwt_cookies(response, refresh):
    response.set_cookie(
        key='access_token',
        value=str(refresh.access_token),
        httponly=True,
        secure=True,  # Use True if using HTTPS
        samesite='Lax',
    )
    response.set_cookie(
        key='refresh_token',
        value=str(refresh),
        httponly=True,
        secure=True,  # Use True if using HTTPS
        samesite='Lax',
    )
    return response
