from django.db import models

# models
from grid.models import Grid

class Timer(models.Model) :
    grid = models.ForeignKey(
        Grid,
        on_delete=models.CASCADE,
        related_name='timer' 
    )
    i = models.CharField(max_length=40)
    type = 'timer'
    created = models.DateField(auto_now_add=True)