# training_sessions/views.py

from rest_framework import viewsets
from .models import Session
from .serializers import SessionSerializer
from rest_framework.permissions import IsAuthenticated

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]
