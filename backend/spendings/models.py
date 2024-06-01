from django.db import models
import uuid

from django.db import models
from django.db.models import Sum
from django.utils import timezone
tz = timezone.get_default_timezone()

from account.models import User

SPENDING_TYPES = [
    ('medications', 'medications'),
    ('products', 'products'),
    ('entertainment', 'entertainment'),
    ('electronics', 'electronics'),
    ('trips', 'trips'),
    ('cloth', 'cloth'),
    ('present', 'present'),
    ('other', 'other'),
]

class Spending(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    one_spending = models.IntegerField()
    spending_type = models.CharField(choices=SPENDING_TYPES, max_length=20)
    reason = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)
    
    def created_at_formated(self):
        return format(self.created_at.astimezone(tz).strftime('%d.%m.%Y'))
    


