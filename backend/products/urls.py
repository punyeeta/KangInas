from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Set up a router for viewsets
router = DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'favorites', views.FavoriteViewSet, basename='favorite')

urlpatterns = [
    path('products/category/<str:category>/', views.get_products_by_category, name='products-by-category'),
    path('categories/', views.get_categories, name='categories'),
    
    # Include viewset URLs (this handles /products/ and /favorites/)
    path('', include(router.urls)),
]
