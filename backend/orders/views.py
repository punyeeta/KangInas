from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializer
from django.shortcuts import get_object_or_404
from cart.models import CartItem

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializer
from django.shortcuts import get_object_or_404
from cart.models import CartItem

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    # Get user's cart items
    cart_items = CartItem.objects.filter(user=request.user)
    
    if not cart_items.exists():
        return Response(
            {'error': 'Your cart is empty'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Create the order and save it to the database
    order = Order(user=request.user, status='Pending')
    order.save()  # Save the order to generate a primary key
    
    # Create order items from cart items
    for cart_item in cart_items:
        OrderItem.objects.create(
            order=order,  # Now the order has a primary key
            product=cart_item.product,
            quantity=cart_item.quantity,
            price=cart_item.product.price
        )
    
    # Clear the user's cart
    cart_items.delete()
    
    # Calculate and update the total_amount for the order
    order._total_amount = sum(item.price * item.quantity for item in order.items.all())
    order.save()  # Save the order again to update the total_amount
    
    # Return the created order
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    """Fetch all orders for the logged-in user."""
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_detail(request, order_id):
    """Fetch details of a specific order."""
    order = get_object_or_404(Order, id=order_id, user=request.user)
    serializer = OrderSerializer(order)
    return Response(serializer.data)