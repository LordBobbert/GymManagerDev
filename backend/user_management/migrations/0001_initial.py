# Generated by Django 4.2.4 on 2024-09-13 19:38

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('gender', models.CharField(blank=True, choices=[('male', 'Male'), ('female', 'Female')], max_length=20, null=True)),
                ('birthday', models.DateField(blank=True, null=True)),
                ('role', models.CharField(choices=[('client', 'Client'), ('trainer', 'Trainer'), ('admin', 'Admin')], default='client', max_length=10)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='TrainerProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('sub_part_time', 'Subcontractor Part Time'), ('sub_full_time', 'Subcontractor Full Time'), ('emp_part_time', 'Employee Part Time'), ('emp_full_time', 'Employee Full Time'), ('inactive', 'Inactive')], default='sub_part_time', max_length=20)),
                ('monthly_rate', models.CharField(choices=[('200', 'Legacy Part Time - $200'), ('250', 'Part Time - $250'), ('1000', 'Full Time - $1000')], default='250', max_length=20)),
                ('rent_rate_per_session', models.CharField(choices=[('15', 'Legacy Part Time - $15'), ('20', 'Part Time - $20')], default='20', max_length=20)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='trainer_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ClientProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('training_status', models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive'), ('vacation', 'Vacation')], default='active', max_length=20)),
                ('personal_training_rate', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('rate_type', models.CharField(choices=[('one_on_one', 'One on One'), ('partner', 'Partner')], default='one_on_one', max_length=20)),
                ('emergency_contact_name', models.CharField(blank=True, max_length=100, null=True)),
                ('emergency_contact_phone', models.CharField(blank=True, max_length=15, null=True)),
                ('trainer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='clients', to='user_management.trainerprofile')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='client_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
