from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Balance
from .serializers import BalanceSerializer
from .forms import BalanceForm


@api_view(['GET'])
def user_balance(request, id):
    balance = Balance.objects.filter(created_by_id=id)
    serializer = BalanceSerializer(balance, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['POST'])
def create_balance(request):
    form = BalanceForm(request.data)

    if form.is_valid():
        balance = form.save(commit=False)
        balance.created_by = request.user
        balance.save()

        serializer = BalanceSerializer(balance)

        return JsonResponse(serializer.data, safe=False)
    else: 
        return JsonResponse({'message': 'error'})
