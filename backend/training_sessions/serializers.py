# training_sessions/serializers.py

from rest_framework import serializers
from .models import Session
from user_management.serializers import ClientProfileSerializer, TrainerProfileSerializer

class SessionSerializer(serializers.ModelSerializer):
    client = ClientProfileSerializer(read_only=True)  # Nested serializer for the client
    trainer = TrainerProfileSerializer(read_only=True)  # Nested serializer for the trainer
    client_id = serializers.PrimaryKeyRelatedField(queryset=ClientProfileSerializer.Meta.model.objects.all(), write_only=True)
    trainer_id = serializers.PrimaryKeyRelatedField(queryset=TrainerProfileSerializer.Meta.model.objects.all(), write_only=True)

    class Meta:
        model = Session
        fields = ['id', 'client', 'trainer', 'session_type', 'date', 'notes', 'client_id', 'trainer_id']

    def create(self, validated_data):
        # Extract the client and trainer IDs from the validated data
        client_id = validated_data.pop('client_id')
        trainer_id = validated_data.pop('trainer_id')

        # Create the session instance
        session = Session.objects.create(client_id=client_id.id, trainer_id=trainer_id.id, **validated_data)
        return session
