from django.shortcuts import render
from rest_framework import viewsets, permissions



# models
from .models import Grid 

# serializer
from .serializers import GridSerializer 

class GridView(viewsets.ModelViewSet) :
    serializer_class = GridSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):#type: ignore
        return Grid.objects.filter(
            user=self.request.user,
            project_id=self.kwargs['project_pk'],
        )
    

