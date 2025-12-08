from rest_framework import serializers

# models
from .models import Tracker

class TrackerSerializer(serializers.ModelSerializer) :
    user = serializers.CharField(source="user.username", read_only=True)
    grid = serializers.CharField(source='grid.id', read_only=True)

    class Meta:
        model = Tracker
        fields = ['id', 'user', 'grid'] 
        read_only_fields = ['user', 'grid']




