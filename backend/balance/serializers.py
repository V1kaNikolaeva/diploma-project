from rest_framework import serializers

from account.serializers import UserSerializer
from .models import Balance


class BalanceSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    class Meta:
        model = Balance
        fields = ('id', 'amount', 'created_by', 'created_at_formated')