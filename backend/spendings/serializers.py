from rest_framework import serializers

from account.serializers import UserSerializer
from .models import Spending


class SpendingSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    class Meta:
        model = Spending
        fields = ('id', 'one_spending', 'created_by', 'created_at_formated', 'reason', 'spending_type')