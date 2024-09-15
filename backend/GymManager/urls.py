# GymManager/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
     # Include user_management URLs with namespace
    path('api/', include(('user_management.urls', 'user_management'), namespace='user_management')),

    # Include training_sessions URLs with namespace
    path('api/', include(('training_sessions.urls', 'training_sessions'), namespace='training_sessions')),
]
