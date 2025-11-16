from django.shortcuts import render
from rest_framework import viewsets, permissions



# models
from .models import Project

# serializer
from .serializers import GridSerializer 

class GridView(viewsets.ModelViewSet) :
    serializer_class = GridSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):#type: ignore
        return Project.objects.filter(user=self.request.user)
    

