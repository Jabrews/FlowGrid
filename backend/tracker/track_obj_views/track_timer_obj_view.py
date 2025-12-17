from django.shortcuts import render 
from rest_framework import viewsets, permissions 
from rest_framework.decorators import action 
from rest_framework.response import Response
from rest_framework import throttling



# models
from ..models import TrackObjTimer 
from grid.models import LayoutItem

# serializers
from ..serializers import TrackObjTimerSerializer

class TrackObjTimerView(viewsets.ModelViewSet):
    serializer_class = TrackObjTimerSerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]

    def get_queryset(self):#type: ignore
        return TrackObjTimer.objects.filter(user=self.request.user)

    def perform_create(self, serializer):#type: ignore

        existingObj = TrackObjTimer.objects.filter(
            trackerI=self.request.data.get("trackerI"),#type: ignore
            gridItemI=self.request.data.get("gridItemI"),#type: ignore
            tracker_id=self.request.data.get("trackerId"),#type: ignore
            timer_id = self.request.data.get("gridItemId"),#type: ignore
            user=self.request.user
        ).first()

        if existingObj:
            return Response({'error': 'Timer Pair Object already created'}, status=404)

        serializer.save(
            trackerI=self.request.data.get("trackerI"),#type: ignore
            gridItemI=self.request.data.get("gridItemI"),#type: ignore
            grid_id = self.request.data.get('gridId'),#type: ignore
            tracker_id=self.request.data.get("trackerId"),#type: ignore
            timer_id = self.request.data.get("gridItemId"),#type: ignore
            user=self.request.user
        )

    @action(
        detail=False,
        methods=['get'],
        url_path=r'findTrackerObjByI/(?P<trackerI>[^/.]+)/(?P<gridItemI>[^/.]+)'
    )
    def findTrackerObjByI(self, request, trackerI=None, gridItemI=None):

        trackObjTimer = TrackObjTimer.objects.filter(
            user=request.user,
            trackerI=trackerI,
            gridItemI=gridItemI
        ).first()

        if not trackObjTimer:
            return Response({"error": "Not found"}, status=404)

        return Response(self.get_serializer(trackObjTimer).data)

    @action(
        detail=False,
        methods=['delete'],
        url_path=r'findTrackerObjByI/(?P<trackerI>[^/.]+)/(?P<gridItemI>[^/.]+)'
    )
    def deleteTrackerObjByI(self, request, trackerI=None, gridItemI=None):

        trackObjTimer = TrackObjTimer.objects.filter(
            user=request.user,
            trackerI=trackerI,
            gridItemI=gridItemI
        ).first()

        if not trackObjTimer:
            return Response({"error": "Not found"}, status=404)

        trackObjTimer.delete()
        return Response({"success": "Successfully deleted item"}, status=200)