from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Spending
from .serializers import SpendingSerializer
from .forms import SpendingForm


@api_view(['GET'])
def user_spending(request, id):
    spending = Spending.objects.filter(created_by_id=id)
    serializer = SpendingSerializer(spending, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['POST'])
def create_spending(request):
    form = SpendingForm(request.data)

    if form.is_valid():
        spending = form.save(commit=False)
        spending.created_by = request.user
        spending.save()

        serializer = SpendingSerializer(spending)

        return JsonResponse(serializer.data, safe=False)
    else:
        message = form.errors.as_json() 
        return JsonResponse({'message': message})
    
@api_view(['PUT'])
def update_spending(request, pk):
    spending = Spending.objects.get(pk=pk)
    serializer = SpendingSerializer(spending, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({ "data": serializer.data })
    return JsonResponse({'message': 'message'})

    
@api_view(['DELETE'])
def delete_spending(request, pk):
    spending = Balance.objects.get(pk=pk)
    spending.delete()

    return JsonResponse({'deletedSpending': pk})