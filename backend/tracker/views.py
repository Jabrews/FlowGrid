from django.shortcuts import render
from rest_framework import viewsets, permissions 

# models
from .models import Tracker
from grid.models import LayoutItem

# serializers
from .serializers import TrackerSerializer

class TrackerView(viewsets.ModelViewSet) :
    serializer_class = TrackerSerializer
    permission_classes =  [permissions.IsAuthenticated]

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



