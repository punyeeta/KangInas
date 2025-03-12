from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CartItem
from .serializers import CartItemSerializer
from products.models import Product
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart_items(request):
    """Fetch the logged-in user's cart items."""
    cart_items = CartItem.objects.filter(user=request.user)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    """Add a product to the logged-in user's cart or update quantity."""
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)  # Default quantity is 1
    product = get_object_or_404(Product, id=product_id)
    cart_item, created = CartItem.objects.get_or_create(
        user=request.user, product=product,
        defaults={'quantity': quantity}
    )
    if not created:
        cart_item.quantity += quantity
        cart_item.save()
    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, product_id):
    """Remove a product from the cart."""
    cart_item = get_object_or_404(CartItem, user=request.user, product_id=product_id)
    cart_item.delete()
    return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)