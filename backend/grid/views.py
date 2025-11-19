from django.shortcuts import render
from rest_framework import viewsets, permissions, generics



# models
from .models import Grid, LayoutItem

# serializer
from .serializers import GridSerializer, LayoutItemSerializer

class GridView(viewsets.ModelViewSet) :
    serializer_class = GridSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):#type: ignore
        return Grid.objects.filter(
            user=self.request.user,
            project_id=self.kwargs['project_pk'],
        )

class LayoutView(generics.ListCreateAPIView):
    serializer_class = LayoutItemSerializer

    def get_queryset(self):#type: ignore
        return LayoutItem.objects.filter(
            grid_id=self.kwargs["grid_id"],
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(
            grid_id=self.kwargs["grid_id"],
            user=self.request.user
        )