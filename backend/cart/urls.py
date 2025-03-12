from django.urls import path
from . import views

urlpatterns = [
    path('cart/', views.get_cart_items, name='cart-items'),
    path('cart/add/', views.add_to_cart, name='add-to-cart'),
    path('cart/remove/<int:product_id>/', views.remove_from_cart, name='remove-from-cart'),
]