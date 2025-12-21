from django.db import models
from django.conf.global_settings import AUTH_USER_MODEL

from grid.models import Grid
from timers.models import Timers

class Tracker(models.Model) :
    grid = models.ForeignKey(
        Grid,
        on_delete=models.CASCADE,
        related_name='tracker'
    )
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tracker'
    )
    i = models.CharField(max_length=40)


class TrackObjTimer(models.Model) :
    customName = models.CharField(max_length=20, default='timer')
    grid = models.ForeignKey(
        Grid,
        on_delete=models.CASCADE,
        related_name='track_obj_timer'
    )
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='track_obj_timer'
    )
    tracker = models.ForeignKey(
        Tracker,
        on_delete=models.CASCADE,
        related_name='track_obj_timer'
    )
    timer = models.ForeignKey(
        Timers,
        on_delete=models.CASCADE,
        related_name='track_obj_timer'
    )
    elaspedSeconds = models.IntegerField(default=0)
    trackerI = models.CharField(max_length=45) 
    gridItemI = models.CharField(max_length=45) 
