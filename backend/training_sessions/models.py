# training_sessions/models.py

from django.db import models
from user_management.models import ClientProfile, TrainerProfile

class Session(models.Model):
    SESSION_TYPE_CHOICES = [
        ('one_on_one', 'One on One'),
        ('partner', 'Partner'),
        ('small_group', 'Small Group'),
        ('group', 'Group'),
    ]

    client = models.ForeignKey(ClientProfile, on_delete=models.CASCADE)
    trainer = models.ForeignKey(TrainerProfile, on_delete=models.CASCADE)
    session_type = models.CharField(max_length=20, choices=SESSION_TYPE_CHOICES)
    date = models.DateTimeField()
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.client.user.first_name} with {self.trainer.user.first_name} on {self.date}"
