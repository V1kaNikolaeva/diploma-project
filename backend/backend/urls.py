
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf import settings


urlpatterns = [
    path('api/', include('account.urls')),
    path('admin/', admin.site.urls),
]
