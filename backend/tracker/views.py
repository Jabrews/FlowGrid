from django.shortcuts import render 
from rest_framework import viewsets, permissions 
from rest_framework.decorators import action 
from rest_framework.response import Response
from rest_framework import throttling

# models
from .models import Tracker
from grid.models import LayoutItem

# serializers
from .serializers import TrackerSerializer

class TrackerView(viewsets.ModelViewSet) :
    serializer_class = TrackerSerializer
    permission_classes =  [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]


    def get_queryset(self): #type: ignore
        Tracker.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
         
        existingTracker = Tracker.objects.filter(
            i=self.request.data.get("i"), #type: ignore
            user=self.request.user
        ).first()


        existingLayout = LayoutItem.objects.filter(
            i=self.request.data.get("i"), #type: ignore
            user=self.request.user
        ).first()

        if existingTracker or not existingLayout:
            return 


        serializer.save(
            grid_id=self.request.data.get("gridId"),#type: ignore
            i=self.request.data.get("i"),#type: ignore
            user=self.request.user
        )

    @action(detail=False, methods=['get'], url_path='findGridItemByI/(?P<i>[^/.]+)')
    def findGridItemByI(self, request, i=None):
        tracker = Tracker.objects.filter(user=request.user, i=i).first()
        if not tracker:
            return Response({"error": "Not found"}, status=404)

        return Response(self.get_serializer(tracker).data)

    @action(detail=False, methods=['delete'], url_path='deleteGridItemByI/(?P<i>[^/.]+)')
    def deleteGridItemByI(self, request, i=None):
        tracker = Tracker.objects.filter(user=request.user, i=i).first()
        if not tracker:
            return Response({"error": "Not found"}, status=404)
        tracker.delete()
        return Response({"success": "Successfully deleted item"}, status=200)

