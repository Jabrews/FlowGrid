from django.db import models
from django.conf.global_settings import AUTH_USER_MODEL

# models
from grid.models import Grid


# folder PANNEL
class NoteDirectory(models.Model) :
    user = models.ForeignKey(
        AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='note_directories'
    ) 
    grid = models.ForeignKey(
        Grid, 
        on_delete=models.CASCADE,
        related_name='note_directories'
    ) 

class NoteFolder(models.Model) :
    user = models.ForeignKey(
        AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='note_folders'
    ) 
    note_directory = models.ForeignKey(
        NoteDirectory,
        on_delete=models.CASCADE,
        related_name='note_folders'
    )
    name = models.CharField(max_length=25)

    
class Note(models.Model) :
    user = models.ForeignKey(
        AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='notes'
    ) 
    note_folder = models.ForeignKey(
        NoteFolder,
        on_delete=models.CASCADE,
        related_name='notes'
    )    
    last_used = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=25)

# note PANNEL
class RawObject(models.Model) :
    user = models.ForeignKey(
        AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='raw_objects'
    ) 
    note = models.ForeignKey(
        Note,
        on_delete=models.CASCADE,
        related_name='raw_objects'
    )
    lineNum = models.IntegerField()
    text = models.CharField(
        max_length=76, 
        blank=True, 
        default='',
    )
 
    
    



    
    


    
    
