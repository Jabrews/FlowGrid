from django.db import models
from django.conf.global_settings import AUTH_USER_MODEL


# models
from grid.models import Grid

class Timer(models.Model) :
    grid = models.ForeignKey(
        Grid,
        on_delete=models.CASCADE,
        related_name='timers' 
    )    
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='timers',
    )    
    i = models.CharField(max_length=40)
    type = 'timer'
    created = models.DateField(auto_now_add=True)