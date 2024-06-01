from django.contrib import admin

# Register your models here.
from .models import Balance


@admin.register(Balance)
class BalanceAdmin(admin.ModelAdmin):
    pass