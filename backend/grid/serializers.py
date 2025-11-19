from rest_framework import serializers

# models
from .models import Grid, LayoutItem

class GridSerializer (serializers.ModelSerializer) :
    user = serializers.CharField(source="user.username", read_only=True)
    project = serializers.CharField(source="project.name", read_only=True)


    class Meta : 
        model = Grid 
        fields = ['created', 'user', 'project', 'id']
        read_only_fields = ['user']


class LayoutItemSerializer(serializers.ModelSerializer):    
    user = serializers.CharField(source="user.username", read_only=True)
    
    class Meta:
        model = LayoutItem
        fields = "__all__"
        read_only_fields = ["user", "grid",]


