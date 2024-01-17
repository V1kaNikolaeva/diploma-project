from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .forms import SignupForm

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def signup(request):
    data = request.data
    message = 'success'

    form = SignupForm({
        'email': data.get('email'),
        'name': data.get('name'),
        'password': data.get('password'),
        'repeat_password': data.get('repeat_password'),
    })

    if form.is_valid():
        form.save()
    else: 
        message = 'error'

    return JsonResponse({'status': message})