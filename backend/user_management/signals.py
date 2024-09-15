# user_management/signals.py

from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import AppConfig
from .models import Role

@receiver(post_migrate)
def create_default_roles(sender, **kwargs):
    if sender.name == 'user_management':  # Ensure it only runs for this app
        Role.objects.get_or_create(name='client')
        Role.objects.get_or_create(name='trainer')
        Role.objects.get_or_create(name='admin')
