# File: training_sessions/serializers.py

from rest_framework import serializers
from training_sessions.models import Session
from user_management.models import TrainerProfile, ClientProfile

class SessionSerializer(serializers.ModelSerializer):
    client_id = serializers.PrimaryKeyRelatedField(
        queryset=ClientProfile.objects.all(), source='client', write_only=True)
    trainer_id = serializers.PrimaryKeyRelatedField(
        queryset=TrainerProfile.objects.all(), source='trainer', write_only=True)
    
    class Meta:
        model = Session
        fields = ['id', 'client', 'trainer', 'session_type', 'date', 'notes', 'client_id', 'trainer_id']

    def create(self, validated_data):
        client_id = validated_data.pop('client')
        trainer_id = validated_data.pop('trainer')
        session = Session.objects.create(client=client_id, trainer=trainer_id, **validated_data)
        return session

    def update(self, instance, validated_data):
        trainer_id = validated_data.pop('trainer', {}).get('id')  # Get trainer ID from request
        if trainer_id:
            try:
                trainer = TrainerProfile.objects.get(id=trainer_id)
                instance.trainer = trainer  # Assign the trainer
            except TrainerProfile.DoesNotExist:
                raise serializers.ValidationError("Invalid trainer ID")

        # Update other fields
        instance.session_type = validated_data.get('session_type', instance.session_type)
        instance.date = validated_data.get('date', instance.date)
        instance.notes = validated_data.get('notes', instance.notes)
        instance.save()
