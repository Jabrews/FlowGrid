# accounts/models.py
from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

class GuestProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    expires_at = models.DateTimeField()
