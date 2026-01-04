from django.db import models
from django.conf.global_settings import AUTH_USER_MODEL

# models
from grid.models import Grid


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
    note_directory = models.ForeignKey(
        NoteDirectory,
        on_delete=models.CASCADE,
        related_name='note_folders'
    )
    name = models.CharField(max_length=25)

    
class Note(models.Model) :
    note_folder = models.ForeignKey(
        NoteFolder,
        on_delete=models.CASCADE,
        related_name='notes'
    )    
    last_used = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=25)
    raw_text = models.CharField(max_length=300)


    


    
    


    
    
