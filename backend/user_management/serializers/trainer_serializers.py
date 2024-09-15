# user_management/serializers/trainer_serializers.py

from rest_framework import serializers
from user_management.models import TrainerProfile, User, Role  # Assuming there's a TrainerProfile model
from .user_serializers import UserSerializer  # Assuming you have a UserSerializer
from django.core.exceptions import ValidationError

class TrainerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Include nested user data

    class Meta:
        model = TrainerProfile
        fields = ['id', 'user', 'status', 'monthly_rate', 'rent_rate_per_session']

    def create(self, validated_data):
        # Extract user data from the nested serializer
        user_data = validated_data.pop('user')

        # Create the User object
        user = User.objects.create(**user_data)

        # Assign the 'trainer' role to the User
        trainer_role, created = Role.objects.get_or_create(name='trainer')
        user.roles.add(trainer_role)

        # Create the TrainerProfile object
        trainer = TrainerProfile.objects.create(user=user, **validated_data)
        return trainer

    def update(self, instance, validated_data):
        # Extract user data from the nested serializer
        user_data = validated_data.pop('user', {})
        user = instance.user  # Get the current User instance

        # Check for changes in username or email
        new_username = user_data.get('username')
        new_email = user_data.get('email')

        if new_username and new_username != user.username:
            if User.objects.filter(username=new_username).exclude(id=user.id).exists():
                raise serializers.ValidationError({'user': {'username': 'A user with that username already exists.'}})

        if new_email and new_email != user.email:
            if User.objects.filter(email=new_email).exclude(id=user.id).exists():
                raise serializers.ValidationError({'user': {'email': 'A user with this email already exists.'}})

        # Update the User fields as necessary
        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()

        # Update the TrainerProfile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
