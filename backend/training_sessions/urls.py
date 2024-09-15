# training_sessions/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SessionViewSet

app_name = 'training_sessions'

router = DefaultRouter()
router.register(r'sessions', SessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
