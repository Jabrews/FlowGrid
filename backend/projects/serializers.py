from rest_framework import serializers

from .models import Project, ProjectFolder


## Project 
class ProjectSerializer(serializers.ModelSerializer):
    folder = serializers.CharField(source="folder.name", read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'last_used', 'folder']


class ProjectFolderSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = ProjectFolder
        fields = ['id', 'user', 'projects', 'name']
        read_only_fields = ['user']
        extra_kwargs = {
            'name': {'required': False}   # because default creation
        }

class PartialProjectFolderSerializer(serializers.ModelSerializer) :
    
    class Meta :
        model = ProjectFolder
        fields = ['id', 'name']