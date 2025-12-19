from rest_framework import viewsets 
from rest_framework.decorators import action
from rest_framework.response import Response

# models
from tracker.models import TrackObjTimer

# serializer
from tracker.serializers import TrackObjTimerSerializer

class AllTrackObjView(viewsets.ViewSet):

    def list(self, request, gridId=None):
        trackObjTimer = TrackObjTimer.objects.filter(
            user=request.user,
            grid_id=gridId
        )
        serializer = TrackObjTimerSerializer(trackObjTimer, many=True)
        return Response(serializer.data)