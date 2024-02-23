from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf import settings


urlpatterns = [
    path('api/', include('account.urls')),
    path('api/balance/', include('balance.urls')),
    path('admin/', admin.site.urls),
]
