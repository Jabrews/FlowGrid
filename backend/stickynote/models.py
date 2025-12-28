from django.db import models
from django.conf.global_settings import AUTH_USER_MODEL


# modals
from grid.models import Grid

class StickyNote (models.Model) :
    grid = models.ForeignKey(
        Grid,
        on_delete=models.CASCADE,
        related_name='sticky_notes',
    )
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sticky_notes',
    )    
    i = models.CharField(max_length=40)
    type = 'sticky_note'
    created = models.DateField(auto_now_add=True)

class StickyNotePage(models.Model) :
    sticky_note = models.ForeignKey(
        StickyNote,
        on_delete=models.CASCADE,
        related_name='sticky_note_pages'
    )
    title = models.CharField(default='title')
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sticky_note_pages',
    ) 





