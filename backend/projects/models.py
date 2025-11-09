from django.db import models
from django.conf.global_settings import AUTH_USER_MODEL 

class ProjectFolder(models.Model) :
    name = models.CharField(max_length=20)
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE, 
        related_name='project_folders' 
    )

class Project(models.Model) :
    ProjectFolder = models.ForeignKey(
        ProjectFolder,
        on_delete=models.CASCADE, 
        related_name='project' 
    )
    last_used = models.DateField(auto_now_add=True)


