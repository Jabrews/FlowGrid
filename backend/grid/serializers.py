from rest_framework import serializers

# models
from .models import Project

class GridSerializer (serializers.ModelSerializer) :
    user = serializers.CharField(source="user.username", read_only=True)
    Project = serializers.CharField(source="project.name", read_only=True)


    class Meta : 
        model = Project
        fields = ['created']
        read_only_fields = ['user']


