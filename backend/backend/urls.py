from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf import settings

from account.views import activateemail


urlpatterns = [
    path('api/', include('account.urls')),
    path('api/balance/', include('balance.urls')),
    path('api/spending/', include('spendings.urls')),
    path('activateemail/', activateemail, name='activateemail'),
    path('admin/', admin.site.urls),
]
