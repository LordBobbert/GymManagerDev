# File: payments/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Payment
from .serializers import PaymentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        # If the user is an admin, return all payments
        if user.is_staff or user.roles.filter(name='admin').exists():
            return Payment.objects.all()
        
        # Otherwise, return only the payments associated with the logged-in user
        return Payment.objects.filter(user=user)
