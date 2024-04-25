from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Spending
from .serializers import SpendingSerializer
from .forms import SpendingForm


@api_view(['GET'])
def user_spending(request, id):
    spendings = Spending.objects.filter(created_by_id=id)
    serializer = SpendingSerializer(spendings, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['POST'])
def create_spending(request):
    form = SpendingForm(request.data)

    if form.is_valid():
        balance = form.save(commit=False)
        balance.created_by = request.user
        balance.save()

        serializer = SpendingSerializer(balance)

        return JsonResponse(serializer.data, safe=False)
    else:
        message = form.errors.as_json() 
        return JsonResponse({'message': message})
    
@api_view(['POST'])
def update_spending(request):
    form = SpendingForm(request.data)

    if form.is_valid():
        balance = form.save(commit=False)
        balance.created_by = request.user
        balance.save()

        serializer = SpendingSerializer(balance)

        return JsonResponse(serializer.data, safe=False)
    else:
        message = form.errors.as_json() 
        return JsonResponse({'message': message})