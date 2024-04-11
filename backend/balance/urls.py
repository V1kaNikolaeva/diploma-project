from django.urls import path

from . import api


urlpatterns = [
    path('<uuid:id>/', api.user_balance, name='user_balance'),
    path('create/', api.create_balance, name='create_balance'),
    path('update/', api.update_balance, name='update_balance'),
]
