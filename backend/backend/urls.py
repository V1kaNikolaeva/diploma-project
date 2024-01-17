
from django.contrib import admin
from django.urls import path, include

from . import api

urlpatterns = [
    path('signup/', api.signup, name='signup'),
    path('api/', include('account.urls')),
    path('admin/', admin.site.urls),
]
