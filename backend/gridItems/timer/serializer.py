from rest_framework import serializers

# models
from .models import Timer

class TimerSerializer(serializers.ModelSerializer) :
    user = serializers.CharField(source="user.username", read_only=True)
    grid = serializers.CharField(source='grid.id', read_only=True)


    class Meta : 
        model = Timer 
        fields = ['i', 'type', 'created', 'grid', 'user']
        read_only_fields = ["user", "grid",]

