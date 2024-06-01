from django.http import HttpResponse

from .models import User


def activateemail(request):
    email = request.GET.get('email', '')
    id = request.GET.get('id', '')

    if email and id:
        user = User.objects.get(id=id, email=email)
        user.is_active = True
        user.save()
    
        return HttpResponse('Все прошло успешно, теперь вы можете войти в свой аккаунт!')
    else:
        return HttpResponse('Неверные параметры!')
