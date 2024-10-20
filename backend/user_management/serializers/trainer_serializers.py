# File: user_management/serializers/trainer_serializers.py

from rest_framework import serializers
from user_management.models import TrainerProfile, User, Role
from .user_serializers import UserSerializer
from .helpers import validate_user_data  # Use the shared helper

class TrainerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = TrainerProfile
        fields = ['id', 'user', 'status', 'monthly_rate', 'rent_rate_per_session']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        validate_user_data(user_data)  # Validate user data with helper

        user = User.objects.create(**user_data)
        trainer_role, _ = Role.objects.get_or_create(name='trainer')
        user.roles.add(trainer_role)

        trainer = TrainerProfile.objects.create(user=user, **validated_data)
        return trainer

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user

        if user_data:
            validate_user_data(user_data, existing_user=user)  # Validate existing user

            for attr, value in user_data.items():
                if getattr(user, attr) != value:
                    setattr(user, attr, value)
            user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
