# GymManager/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
      # Include user_management URLs with a unique path
    path('api/user-management/', include(('user_management.urls', 'user_management'), namespace='user_management')),

    # Include training_sessions URLs with a unique path
    path('api/training-sessions/', include(('training_sessions.urls', 'training_sessions'), namespace='training_sessions')),
]