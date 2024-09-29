# File: payments/models.py

from django.db import models
from django.contrib.auth import get_user_model

# Define the payment methods
PAYMENT_METHOD_CHOICES = [
    ('cash', 'Cash'),
    ('credit', 'Credit'),
    ('debit', 'Debit'),
    ('etransfer', 'E-Transfer'),
]

User = get_user_model()  # Reference the user model, which could be a trainer or a client

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    
    def __str__(self):
        return f"{self.user.username} - {self.amount} - {self.payment_method} - {self.payment_date}"
