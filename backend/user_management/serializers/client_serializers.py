from rest_framework import serializers
from user_management.models import ClientProfile, User, Role
from .user_serializers import UserSerializer
from django.core.exceptions import ValidationError

class ClientProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Include nested user data
    trainer = UserSerializer(read_only=True)

    # Use PrimaryKeyRelatedField for setting the trainer by its primary key (id)
    trainer_id = serializers.PrimaryKeyRelatedField(
        source='trainer',
        queryset=User.objects.filter(roles__name='trainer'),
        write_only=True
    )

    class Meta:
        model = ClientProfile
        fields = ['id', 'user', 'training_status', 'personal_training_rate', 'rate_type', 'trainer', 'trainer_id', 'emergency_contact_name', 'emergency_contact_phone']

    def create(self, validated_data):
        # Extract the nested 'user' data
        user_data = validated_data.pop('user')

        # Check if the username or email already exists
        new_username = user_data.get('username')
        new_email = user_data.get('email')

        if User.objects.filter(username=new_username).exists():
            raise serializers.ValidationError({'user': {'username': 'A user with that username already exists.'}})

        if User.objects.filter(email=new_email).exists():
            raise serializers.ValidationError({'user': {'email': 'A user with this email already exists.'}})

        # Create the user instance
        user = User.objects.create(**user_data)

        # Now create the client profile with the user and other validated data
        client_profile = ClientProfile.objects.create(user=user, **validated_data)

        return client_profile

    def update(self, instance, validated_data):
        # Handle the nested 'user' fields
        user_data = validated_data.pop('user', {})
        user = instance.user

        # Check for changes in username or email, ensuring we exclude the current user
        new_username = user_data.get('username')
        new_email = user_data.get('email')

        # Check and update username if it's provided and different from the current one
        if new_username and new_username != user.username:
            # Ensure the new username doesn't already exist for another user
            if User.objects.filter(username=new_username).exclude(id=user.id).exists():
                raise serializers.ValidationError({'user': {'username': 'A user with that username already exists.'}})

        # Check and update email if it's provided and different from the current one
        if new_email and new_email != user.email:
            # Ensure the new email doesn't already exist for another user
            if User.objects.filter(email=new_email).exclude(id=user.id).exists():
                raise serializers.ValidationError({'user': {'email': 'A user with this email already exists.'}})

        # Update the user fields only if they have changed
        for attr, value in user_data.items():
            # Only update the attribute if it's different from the current value
            if getattr(user, attr) != value:
                setattr(user, attr, value)

        # Save the updated user data
        user.save()

        # Handle the trainer update if `trainer_id` is provided
        trainer_id = validated_data.pop('trainer_id', None)
        if trainer_id:
            try:
                trainer = User.objects.get(id=trainer_id)
                instance.trainer = trainer
            except User.DoesNotExist:
                raise serializers.ValidationError({'trainer_id': 'Trainer not found.'})

        # Update the rest of the client profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Save the updated client profile data
        instance.save()

        return instance
