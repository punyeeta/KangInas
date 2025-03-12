from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    # Authentication endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # Profile endpoints
    path('profile/update/', ProfileUpdateView.as_view(), name='profile-update'),
    path('profile/picture/', ProfilePictureUpdateView.as_view(), name='profile-picture-update'),
    path('profile/dietary-preferences/', DietaryPreferencesView.as_view(), name='dietary-preferences'),
]

# Add this to serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)