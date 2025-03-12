from rest_framework import serializers
from .models import Product, Favorite   

class ProductSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image_url', 'available', 
                 'category', 'category_display', 'created_at', 
                 'ingredients', 'serving_size', 'dietary_info']
        
class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'product', 'created_at']
        read_only_fields = ['user']
        
    def create(self, validated_data):
        # Get the user from the request
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

class ProductWithFavoriteSerializer(serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image_url', 
                  'available', 'category', 'ingredients', 'serving_size', 
                  'dietary_info', 'is_favorite']
        
    def get_is_favorite(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return False
        return Favorite.objects.filter(user=user, product=obj).exists()