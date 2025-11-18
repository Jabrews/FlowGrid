from django.db import models
from django.conf import settings
from django.conf.global_settings import AUTH_USER_MODEL

# Project
from projects.models import Project

## NOTICE, grid created alongside project
class Grid(models.Model):
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='grid'
    )
    project = models.OneToOneField(
        Project,
        on_delete=models.CASCADE,
        related_name='grid'
    )
    created = models.DateField(auto_now_add=True)
