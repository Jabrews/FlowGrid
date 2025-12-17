from rest_framework import serializers

# models
from .models import Tracker, TrackObjTimer

class TrackerSerializer(serializers.ModelSerializer) :
    user = serializers.CharField(source="user.username", read_only=True)
    grid = serializers.CharField(source='grid.id', read_only=True)

    class Meta:
        model = Tracker
        fields = ['id', 'user', 'grid'] 
        read_only_fields = ['user', 'grid']


class TrackObjTimerSerializer(serializers.ModelSerializer) :
    user = serializers.CharField(source="user.username", read_only=True)
    gridId = serializers.CharField(source='grid.id', read_only=True)
    trackerId = serializers.CharField(source='tracker.id', read_only=True)


    class Meta : 
        model = TrackObjTimer
        fields = ['id', 'user', 'gridId', 'trackerId', 'trackerI', 'gridItemI', 'elaspedSeconds']
        read_only_fields = ['user', 'gridId', 'trackerId']



