from django.urls import path

from . import api


urlpatterns = [
    path('<uuid:id>/', api.user_spending, name='user_spending'),
    path('create/', api.create_spending, name='create_spending'),
]