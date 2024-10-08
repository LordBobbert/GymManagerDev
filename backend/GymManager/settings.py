"""
Django settings for GymManager project.

Generated by 'django-admin startproject' using Django 4.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY=os.getenv('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [ 'localhost' ]


# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'user_management',
    'training_sessions',
    'rest_framework',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework_simplejwt.token_blacklist',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'GymManager.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'GymManager.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# Database Configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.getenv('DJANGO_PGHOST'),
        'USER': os.getenv('DJANGO_PGUSER'),
        'PORT': os.getenv('DJANGO_PGPORT'),
        'NAME': os.getenv('DJANGO_PGDATABASE'),
        'PASSWORD': os.getenv('DJANGO_PGPASSWORD'),
    }
}

AUTH_USER_MODEL = 'user_management.User'

# Simple JWT Configuration
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),  # Set your desired token expiration time
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),     # Set refresh token expiration time
    'ROTATE_REFRESH_TOKENS': True,                   # Automatically issue a new refresh token when refreshing the access token
    'BLACKLIST_AFTER_ROTATION': True,                # Blacklist the old refresh token after rotation
    'UPDATE_LAST_LOGIN': True,                       # Update last login on token refresh

    'ALGORITHM': 'HS256',                            # Default algorithm for signing the token
    'SIGNING_KEY': SECRET_KEY,                       # Use the Django SECRET_KEY for signing tokens
    'VERIFYING_KEY': None,                           # Only needed if you're using asymmetric algorithms (RS256)
    
    # 'AUTH_HEADER_TYPES': ('Bearer',),                # Specifies the type of token in the Authorization header (typically Bearer)
    # 'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    
    'TOKEN_USER_CLASS': 'user_management.models.User',  # If you're using a custom user model
    'TOKEN_TYPE_CLAIM': 'token_type',

    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),  # For sliding tokens, if needed
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),

    # Cookie-related settings (you are already using JWT in cookies)
    'COOKIE_SECURE': True,                           # Use secure cookies (only for HTTPS)
    'COOKIE_HTTPONLY': True,                         # Prevent JavaScript access to the cookies
    'COOKIE_SAMESITE': 'Lax',                        # For CSRF protection in the cookies
}
SECURE_COOKIES=True

# CORS configuration
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Frontend URL
]

# Trusted Origins for CSRF
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'https://localhost:3000',
]


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
