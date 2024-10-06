# File: user_management/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError


class Role(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


# Extending the default User model to include additional fields
class User(AbstractUser):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    roles = models.ManyToManyField(Role, related_name='users', blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


# ClientProfile Model
class ClientProfile(models.Model):
    TRAINING_STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('vacation', 'Vacation'),
    ]

    PERSONAL_TRAINING_RATE_CHOICES = [
        ('one_on_one', 'One on One'),
        ('partner', 'Partner'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='client_profile')
    training_status = models.CharField(max_length=20, choices=TRAINING_STATUS_CHOICES, default='active')
    personal_training_rate = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    rate_type = models.CharField(max_length=20, choices=PERSONAL_TRAINING_RATE_CHOICES, default='one_on_one')
    trainer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='clients')
    emergency_contact_name = models.CharField(max_length=100, blank=True, null=True)
    emergency_contact_phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f"Client: {self.user.first_name} {self.user.last_name}"


# TrainerProfile Model
class TrainerProfile(models.Model):
    STATUS_CHOICES = [
        ('sub_part_time', 'Subcontractor Part Time'),
        ('sub_full_time', 'Subcontractor Full Time'),
        ('emp_part_time', 'Employee Part Time'),
        ('emp_full_time', 'Employee Full Time'),
        ('inactive', 'Inactive'),
    ]

    MONTHLY_RATE_CHOICES = [
        ('200', 'Legacy Part Time - $200'),
        ('250', 'Part Time - $250'),
        ('1000', 'Full Time - $1000'),
    ]

    GYM_SESSION_RATE_CHOICES = [
        ('15', 'Legacy Part Time - $15'),
        ('20', 'Part Time - $20'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='trainer_profile')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='sub_part_time')
    monthly_rate = models.CharField(max_length=20, choices=MONTHLY_RATE_CHOICES, default='250')
    rent_rate_per_session = models.CharField(max_length=20, choices=GYM_SESSION_RATE_CHOICES, default='20')

    def __str__(self):
        return f"Trainer: {self.user.first_name} {self.user.last_name}"
