from django.db import models
from django.conf import settings 

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('ALL', 'all'),
        ('AGAHAN', 'agahan'),
        ('TANGHALIAN', 'tanghalian'),
        ('HAPUNAN', 'hapunan'),
        ('MERIENDA', 'merienda'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.CharField(max_length=255, blank=True, null=True)
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='ALL')
    
    # New fields
    ingredients = models.TextField(blank=True, null=True)
    serving_size = models.CharField(max_length=100, blank=True, null=True)
    dietary_info = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.name
    

class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favorites')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='favorited_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Ensures a user can't favorite the same product twice
        unique_together = ('user', 'product')
        
    def __str__(self):
        return f"{self.user.username} - {self.product.name}"