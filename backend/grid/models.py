from django.db import models
from django.conf import settings
from django.conf.global_settings import AUTH_USER_MODEL

# Project
from projects.models import Project

## NOTICE, grid obj created alongside project
class Grid(models.Model):
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='grid',
    )
    project = models.OneToOneField(
        Project,
        on_delete=models.CASCADE,
        related_name='grid'
    )
    created = models.DateField(auto_now_add=True)


class LayoutItem(models.Model) :
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='layout_items'
    )
    grid = models.ForeignKey(
        Grid,
        on_delete=models.CASCADE,
        related_name='layout_items'
    )
    i = models.CharField(max_length=10)
    x = models.IntegerField()
    y = models.IntegerField()
    w = models.IntegerField()
    h = models.IntegerField()
    static = models.BooleanField(default=False)
    isResizeable = models.BooleanField(default=False)
