# File: user_management/serializers/client_serializers.py

from rest_framework import serializers
from user_management.models import ClientProfile, User, Role
from .user_serializers import UserSerializer
from .helpers import validate_user_data  # Import the helper function

class ClientProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    trainer = UserSerializer(read_only=True)
    
    trainer_id = serializers.PrimaryKeyRelatedField(
        source='trainer',
        queryset=User.objects.filter(roles__name='trainer').distinct(),
        write_only=True
    )

    class Meta:
        model = ClientProfile
        fields = [
            'id', 'user', 'training_status', 'personal_training_rate', 
            'rate_type', 'trainer', 'trainer_id', 'emergency_contact_name', 
            'emergency_contact_phone'
        ]

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        validate_user_data(user_data)  # Validate user data with helper

        user = User.objects.create(**user_data)
        client_role, _ = Role.objects.get_or_create(name='client')
        user.roles.add(client_role)

        client_profile = ClientProfile.objects.create(user=user, **validated_data)
        return client_profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        user = instance.user

        if user_data:
            validate_user_data(user_data, existing_user=user)  # Validate existing user

            for attr, value in user_data.items():
                if getattr(user, attr) != value:
                    setattr(user, attr, value)
            user.save()

        trainer_id = validated_data.pop('trainer_id', None)
        if trainer_id is not None:
            instance.trainer = User.objects.get(id=trainer_id)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
