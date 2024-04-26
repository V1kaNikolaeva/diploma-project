from django.urls import path

from . import api


urlpatterns = [
    path('<uuid:id>/', api.user_balance, name='user_balance'),
    path('create/', api.create_balance, name='create_balance'),
    path('update/<pk>/', api.update_balance, name='update_balance'),
    path('delete/<pk>/', api.delete_balance, name='delete_balance'),
]
