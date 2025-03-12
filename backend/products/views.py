from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Product, Favorite
from .serializers import ProductSerializer,FavoriteSerializer,ProductWithFavoriteSerializer
from rest_framework.decorators import action 
from rest_framework import viewsets, status, permissions

@api_view(['GET'])
@permission_classes([AllowAny])
def get_products_by_category(request, category):
    """Fetch products filtered by category."""
    if category.upper() == 'ALL':
        products = Product.objects.filter(available=True)
    else:
        products = Product.objects.filter(category=category.upper(), available=True)
    
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_categories(request):
    """Get all available product categories."""
    # Get unique categories actually used in the database
    used_categories = Product.objects.values_list('category', flat=True).distinct().order_by('category')
    
    # Map categories to their display names using the CATEGORY_CHOICES
    category_dict = dict(Product.CATEGORY_CHOICES)
    
    # Start with ALL (if not already in used_categories)
    categories = []
    if 'ALL' not in used_categories:
        categories.append({"value": "ALL", "label": "All"})
    
    # Add all categories with their display names
    for cat in used_categories:
        categories.append({"value": cat, "label": category_dict.get(cat, cat)})
    
    return Response(categories)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductWithFavoriteSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['post'], url_path='toggle/(?P<product_id>[^/.]+)')
    def toggle_favorite(self, request, product_id=None):
        try:
            product = Product.objects.get(pk=product_id)
            favorite = Favorite.objects.filter(user=request.user, product=product)
            
            if favorite.exists():
                # Remove from favorites
                favorite.delete()
                return Response({'status': 'removed from favorites'}, status=status.HTTP_200_OK)
            else:
                # Add to favorites
                Favorite.objects.create(user=request.user, product=product)
                return Response({'status': 'added to favorites'}, status=status.HTTP_201_CREATED)
                
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def favorites_list(self, request):
        favorites = self.get_queryset()
        product_ids = favorites.values_list('product_id', flat=True)
        products = Product.objects.filter(id__in=product_ids)
        
        serializer = ProductWithFavoriteSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)
