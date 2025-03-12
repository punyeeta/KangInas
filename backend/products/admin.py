from django.contrib import admin
from .models import Product,Favorite

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'available', 'category')
    search_fields = ('name',)
    list_filter = ('available', 'category')
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'price', 'image_url', 'available', 'category')
        }),
        ('Additional Information', {
            'fields': ('ingredients', 'serving_size', 'dietary_info')
        }),
    )
@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'created_at')
    search_fields = ('user__username', 'product__name')
    list_filter = ('created_at',)