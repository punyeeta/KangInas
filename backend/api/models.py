from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # In AbstractUser, username already exists
    # first_name and last_name are also available from AbstractUser
    # We'll add full_name as a separate field
    full_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    
    # Dietary preferences
    is_vegetarian = models.BooleanField(default=False)
    is_vegan = models.BooleanField(default=False)
    is_pescatarian = models.BooleanField(default=False)
    is_flexitarian = models.BooleanField(default=False)
    is_paleo = models.BooleanField(default=False)
    is_ketogenic = models.BooleanField(default=False)
    is_halal = models.BooleanField(default=False)
    is_kosher = models.BooleanField(default=False)
    is_fruitarian = models.BooleanField(default=False)
    is_gluten_free = models.BooleanField(default=False)
    is_dairy_free = models.BooleanField(default=False)
    is_organic = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Required when creating a superuser

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="custom_user_groups",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_user_permissions",
        blank=True
    )