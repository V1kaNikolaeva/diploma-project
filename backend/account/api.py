from django.conf import settings
from django.http import JsonResponse
from backend.settings import EMAIL_HOST_USER

# from django.contrib.auth.forms import PasswordChangeForm
from django.core.mail import send_mail
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .forms import SignupForm


@api_view(['GET'])
def home(request):
    return JsonResponse({
        'id': request.user.id,
        'name': request.user.name,
        'email': request.user.email,
        'date': request.user.date_joined,
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
        user = form.save()
        # user.is_active = False
        user.save()

        # url = f'{settings.WEBSITE_URL}/activateemail/?email={user.email}&id={user.id}'
        # send_mail(
        #     "Подтверждение аккаунта",
        #     f"Чтобы активировать свой аккаунт перейдите по ссылке: { url }",
        #     f"{ EMAIL_HOST_USER }@mail.ru",
        #     [user.email],
        #     fail_silently=False,
        # )
    else: 
        message = form.errors.as_json()

    return JsonResponse({'message': message})