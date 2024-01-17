from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django import path
urlpatterns = {
    path('login/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('refresh/', TokenObtainPairView.as_view(), name='token_refresh'),
}