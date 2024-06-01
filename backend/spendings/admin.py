from django.contrib import admin

# Register your models here.
from .models import Spending


@admin.register(Spending)
class SpendingAdmin(admin.ModelAdmin):
    pass