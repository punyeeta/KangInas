from django.urls import path
from . import views

urlpatterns = [
    path('orders/', views.get_orders, name='get-orders'),
    path('orders/create/', views.create_order, name='create-order'),
    path('orders/<int:order_id>/', views.get_order_detail, name='order-detail'),
]