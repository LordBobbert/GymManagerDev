# File: user_management/serializers/helpers.py

from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

def validate_user_data(user_data, existing_user=None):
    """
    Validate the uniqueness of the username and email.
    """
    new_username = user_data.get('username')
    new_email = user_data.get('email')

    if new_username and (not existing_user or new_username != existing_user.username):
        if User.objects.filter(username=new_username).exclude(id=existing_user.id if existing_user else None).exists():
            raise serializers.ValidationError({'user': {'username': 'A user with that username already exists.'}})

    if new_email and (not existing_user or new_email != existing_user.email):
        if User.objects.filter(email=new_email).exclude(id=existing_user.id if existing_user else None).exists():
            raise serializers.ValidationError({'user': {'email': 'A user with this email already exists.'}})
