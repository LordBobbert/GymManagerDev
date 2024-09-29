# File: payments/serializers.py

from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user', 'amount', 'payment_date', 'payment_method']
        read_only_fields = ['id', 'payment_date']
