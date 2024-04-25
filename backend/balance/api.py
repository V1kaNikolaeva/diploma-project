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
        message = form.errors.as_json() 
        return JsonResponse({'message': message})
    
@api_view(['PUT'])
def update_balance(request, pk):
    balance = Balance.objects.get(pk=pk)
    serializer = BalanceSerializer(balance, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({ "data": serializer.data })
    return JsonResponse({'message': 'message'})

    
@api_view(['DELETE'])
def delete_balance(request, pk):
    balance = Balance.objects.filter(created_by=request.user).get(pk=pk)
    balance.delete()

    return JsonResponse({'message': 'message'})
