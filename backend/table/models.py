from django.db import models
from django.conf.global_settings import AUTH_USER_MODEL


# Create your models here.
from grid.models import Grid

class Table(models.Model) :

    grid = models.ForeignKey(
        Grid,
        on_delete=models.CASCADE,
        related_name='tables',
    )

    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tables'
    )
    i = models.CharField(max_length=40)
    name = models.CharField(
        max_length=20,
        default='untitled table'
    )

class Column(models.Model) :
    table = models.ForeignKey(
        Table,
        on_delete=models.CASCADE,
        related_name='columns',
    )

    index = models.IntegerField()

class Row(models.Model) :
    table = models.ForeignKey(
        Table,
        on_delete=models.CASCADE,
        related_name='rows',
    )
    index = models.IntegerField()



class Cell(models.Model) :
    table = models.ForeignKey(
        Table,
        on_delete=models.CASCADE,
        related_name='cells',
    )
    column = models.ForeignKey(
        Column,
        on_delete=models.CASCADE,
        related_name='cells'
    )
    rows = models.ForeignKey(
        Row ,
        on_delete=models.CASCADE,
        related_name='cells'
    )
    text = models.CharField(max_length=50, default='')



    

