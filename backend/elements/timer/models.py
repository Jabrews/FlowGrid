from django.db import models

# models
from grid.models import Grid


class Timer(models.Model) :
    type = models.CharField(default='timer')
    grid = models.ForeignKey(
        Grid,
        on_delete=models.CASCADE,
        related_name='items'
    )    
    created = models.DateField(auto_now_add=True)
    i = models.CharField(max_length=30)



