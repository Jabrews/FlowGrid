from django.db import models
from django.conf import settings
from django.conf.global_settings import AUTH_USER_MODEL

# Project
from projects.models import Project


class Grid(models.Model):
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='grid'
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='grid'
    )
    created = models.DateField(auto_created=True)