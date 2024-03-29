import uuid

from django.db import models
from django.db.models import Sum

from django.utils.timesince import timesince

from account.models import User


class Balance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    amount = models.IntegerField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)
    
    def created_at_formated(self):
        return timesince(self.created_at)
    

