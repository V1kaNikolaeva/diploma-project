from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Balance
from .serializer import BalanceSerializer
from .forms import BalanceForm


@api_view(['GET'])
def user_balance(request):
    balance = Balance.objects.all()
    serializer = BalanceSerializer(balance, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['POST'])
def create_balance(request):
    message = 'success'

    form = BalanceForm({
        'amount': request.data.get('amount'),
    })

    if form.is_valid():
        form.save()
    else: 
        message = form.errors.as_json()

    return JsonResponse({'message': message})
