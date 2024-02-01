from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .forms import SignupForm


@api_view(['GET'])
def home(request):
    return JsonResponse({
        'id': request.user.id,
        'name': request.user.name,
        'email': request.user.email,
    })

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def signup(request):
    message = 'success'

    form = SignupForm({
        'name': request.data.get('name'),
        'email': request.data.get('email'),
        'password1': request.data.get('password'),
        'password2': request.data.get('repeatPassword'),
    })

    if form.is_valid():
        form.save()
    else: 
        message = form.errors.as_json()

    return JsonResponse({'message': message})