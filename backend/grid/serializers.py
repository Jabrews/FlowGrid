from rest_framework import serializers

# models
from .models import Grid 

class GridSerializer (serializers.ModelSerializer) :
    user = serializers.CharField(source="user.username", read_only=True)
    project = serializers.CharField(source="project.name", read_only=True)


    class Meta : 
        model = Grid 
        fields = ['created', 'user', 'project']
        read_only_fields = ['user']


