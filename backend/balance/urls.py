from django.urls import path

from . import api


urlpatterns = [
    path('', api.user_balance, name='user_balance'),
    path('create/', api.create_balance, name='create_balance'),
]
