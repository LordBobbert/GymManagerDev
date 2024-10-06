from rest_framework import serializers
from user_management.models import ClientProfile, User, Role
from .user_serializers import UserSerializer

class ClientProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Include nested user data
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

    def validate_user_data(self, user_data, existing_user=None):
        """Validates uniqueness of the username and email if they are provided."""
        new_username = user_data.get('username')
        new_email = user_data.get('email')

        if new_username and (not existing_user or new_username != existing_user.username):
            if User.objects.filter(username=new_username).exclude(id=existing_user.id if existing_user else None).exists():
                raise serializers.ValidationError({'user': {'username': 'A user with that username already exists.'}})

        if new_email and (not existing_user or new_email != existing_user.email):
            if User.objects.filter(email=new_email).exclude(id=existing_user.id if existing_user else None).exists():
                raise serializers.ValidationError({'user': {'email': 'A user with this email already exists.'}})

    def create(self, validated_data):
        # Extract nested user data
        user_data = validated_data.pop('user')

        # Validate the user data
        self.validate_user_data(user_data)

        # Create the User instance
        user = User.objects.create(**user_data)

        # Assign the client role
        client_role, _ = Role.objects.get_or_create(name='client')
        user.roles.add(client_role)

        # Create the ClientProfile instance
        client_profile = ClientProfile.objects.create(user=user, **validated_data)

        return client_profile


    # Handle updates to an existing ClientProfile and associated User
    def update(self, instance, validated_data):
        # Extract user data and handle updates to the user
        user_data = validated_data.pop('user', None)
        user = instance.user  # Associated user instance

        # Validate user data if provided
        if user_data:
            self.validate_user_data(user_data, existing_user=user)

            # Update only the provided user fields
            for attr, value in user_data.items():
                if getattr(user, attr) != value:
                    setattr(user, attr, value)
            user.save()

        # Handle trainer assignment if trainer_id is provided
        trainer_id = validated_data.pop('trainer_id', None)
        if trainer_id is not None:
            instance.trainer = User.objects.get(id=trainer_id)

        # Update the ClientProfile instance with the provided validated data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance