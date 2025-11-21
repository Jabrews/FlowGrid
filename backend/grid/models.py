from django.db import models
from django.conf import settings
from django.conf.global_settings import AUTH_USER_MODEL

## item foriegn key stuff
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


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
    i = models.CharField(max_length=20)
    x = models.IntegerField()
    y = models.IntegerField()
    w = models.IntegerField()
    h = models.IntegerField()
    static = models.BooleanField(default=False)
    isResizeable = models.BooleanField(default=False)


class GridItem(models.Model) :
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='items',
    )
    grid = models.ForeignKey(
        Grid, 
        on_delete=models.CASCADE, 
        related_name="items"
    )

    # generic relation fields
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()

    # actual referenced model (LayoutItem, TextItem, etc)
    element = GenericForeignKey("content_type", "object_id")

    created = models.DateTimeField(auto_now_add=True)