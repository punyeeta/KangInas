from django.contrib import admin
from .models import CartItem

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity')
    search_fields = ('product__name', 'user__username', 'user__email')
    list_filter = ('user',)