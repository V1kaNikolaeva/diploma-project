from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

from . import api


urlpatterns = [
    path('home/', api.home, name='home'),
    path('signup/', api.signup, name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] 
