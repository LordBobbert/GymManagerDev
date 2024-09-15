from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, ClientProfile, TrainerProfile

# Custom UserAdmin class
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    # Display these fields in the list view
    list_display = ('username', 'email', 'first_name', 'last_name', 'display_roles')
    # Enable filtering by roles
    list_filter = ('roles',)
    
    # Define the fieldsets for the User form in the admin panel
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'phone_number', 'gender', 'birthday')}),
        (_('Roles and Status'), {'fields': ('roles',)}),  # Add roles field
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    
    # Add the roles field to the add_fieldsets for creating a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email', 'first_name', 'last_name', 'roles'),
        }),
    )
    
    # Add a method to display roles as a comma-separated list
    def display_roles(self, obj):
        return ", ".join([role.name for role in obj.roles.all()])
    display_roles.short_description = 'Roles'

    # Use the modified fields for filtering
    filter_horizontal = ('roles',)  # Add this line to use the ManyToManyField correctly

# Register the ClientProfile model with default ModelAdmin
@admin.register(ClientProfile)
class ClientProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'training_status', 'personal_training_rate', 'trainer')
    list_filter = ('training_status',)
    search_fields = ('user__username', 'user__email', 'user__first_name', 'user__last_name')

# Register the TrainerProfile model with default ModelAdmin
@admin.register(TrainerProfile)
class TrainerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'monthly_rate', 'rent_rate_per_session')
    list_filter = ('status',)
    search_fields = ('user__username', 'user__email', 'user__first_name', 'user__last_name')
