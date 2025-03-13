from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from cloudinary.forms import CloudinaryFileField

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    # Don't explicitly define profile_picture here, let it be handled by the model
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'phone_number', 
                 'profile_picture', 'date_joined', 'is_vegetarian', 
                 'is_vegan', 'is_pescatarian', 'is_flexitarian', 'is_paleo', 
                 'is_ketogenic', 'is_halal', 'is_kosher', 'is_fruitarian', 
                 'is_gluten_free', 'is_dairy_free', 'is_organic', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'profile_picture': {'required': False},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        # Handle all other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance