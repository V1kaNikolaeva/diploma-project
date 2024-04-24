from django.forms import ModelForm
from .models import Spending


class SpendingForm(ModelForm):
    class Meta:
        model = Spending
        fields = ('one_spending', 'reason', 'spending_type')