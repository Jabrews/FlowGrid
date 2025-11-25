from django.shortcuts import render 
from rest_framework.response import Response
from rest_framework import viewsets, permissions, generics , throttling
from rest_framework.exceptions import ValidationError

# models
from .models import Grid, LayoutItem

# serializer
from .serializers import GridSerializer, LayoutItemSerializer


class GridView(viewsets.ModelViewSet):
    serializer_class = GridSerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]


    # return list of grids in project (should only be one)
    def get_queryset(self):#type: ignore
        return Grid.objects.filter(
            user=self.request.user,
            project_id=self.kwargs["project_pk"]
        )

    # Correctly return one grid
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        grid = queryset.first()   
        serializer = self.get_serializer(grid)
        return Response(serializer.data)
    

class LayoutListView(generics.ListCreateAPIView):
    serializer_class = LayoutItemSerializer
    throttle_classes = [throttling.UserRateThrottle]
    MAX_LAYOUTS = 75 

    def get_queryset(self):#type: ignore
        return LayoutItem.objects.filter(
            grid_id=self.kwargs["grid_id"],
            user=self.request.user
        )

    def perform_create(self, serializer):
        existing_count = LayoutItem.objects.filter(
            grid_id=self.kwargs["grid_id"],
            user=self.request.user
        ).count()
        if existing_count >= self.MAX_LAYOUTS:
            raise ValidationError({'error': 'Too many Layout Items'})
        serializer.save(
            grid_id=self.kwargs["grid_id"],
            user=self.request.user
        )

class LayoutDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LayoutItemSerializer

    def get_queryset(self):  # type: ignore
        return LayoutItem.objects.filter(
            grid_id=self.kwargs["grid_id"],
            user=self.request.user
        )

    
