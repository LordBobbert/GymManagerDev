# user_management/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user_management.views.authentication_views import CurrentUserView
from .views import (
    authentication_views,
    dashboard_views,
    user_management_views,
    client_views,
    trainer_views
)

app_name = 'user_management'

# Set up the router for ViewSets
router = DefaultRouter()
router.register(r'admin/clients', client_views.ClientProfileViewSet, basename='clientprofile')
router.register(r'admin/trainers', trainer_views.TrainerProfileViewSet, basename='trainerprofile')
router.register(r'admin/users', user_management_views.UserViewSet, basename='user')

urlpatterns = [
    # Authentication routes
    path('auth/login/', authentication_views.LoginView.as_view(), name='login'),
    path('auth/logout/', authentication_views.LogoutView.as_view(), name='logout'),
    path('auth/refresh/', authentication_views.CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/current_user/', CurrentUserView.as_view(), name='current_user'),

    # Dashboard routes
    path('admin/dashboard/', dashboard_views.admin_dashboard, name='admin_dashboard'),
    path('trainer/dashboard/', dashboard_views.trainer_dashboard, name='trainer_dashboard'),
    path('client/dashboard/', dashboard_views.client_dashboard, name='client_dashboard'),

    # user_management/urls.py or admin URLs
    path('admin/clients/', client_views.ClientProfileViewSet.as_view(), name='admin_clients'),


    # Include the router URLs for users, clients, and trainers
    path('', include(router.urls)),  # This will include /admin/clients/, /admin/trainers/, and /admin/users/ endpoints
]

