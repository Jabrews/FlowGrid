from rest_framework import serializers

# models
from .models import Timer


class TimerSerializer(serializers.ModelSerializer) :
    grid_id = serializers.CharField(source='grid.id', read_only=True)

    class Meta : 
        model = Timer
        fields = ['created', 'i', 'grid_id', 'type']
        read_only_fields = ['grid_id']
