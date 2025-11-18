from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

# models
from .models import ProjectFolder, Project
from grid.models import Grid #we only create here

# serializers
from .serializers import ProjectFolderSerializer, PartialProjectFolderSerializer
from .serializers import ProjectSerializer, PartialProjectSerializer

class ProjectFolderView(viewsets.ModelViewSet) :
    serializer_class = ProjectFolderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self): #type: ignore
        return ProjectFolder.objects.filter(user=self.request.user)
        
    def perform_create(self, serializer):
        user = self.request.user
        serializer.is_valid(raise_exception=True)
        existing_count = ProjectFolder.objects.filter(user=user).count()
        default_name = f"Folder-{existing_count + 1}"
        name = serializer.validated_data.get("name", default_name)
        serializer.save(user=user, name=name)



    def get_serializer_class(self): #type: ignore
        # used within home menu on frontend
        if self.action == "folder_names":
            return PartialProjectFolderSerializer
        else :
            return ProjectFolderSerializer

    # for deconstucted data on menu side pannel
    @action(methods=['get'], detail=False, url_path='folder_names')
    def folder_names(self, request):
        folders = self.get_queryset()
        serializer = self.get_serializer(folders, many=True)
        return Response(serializer.data)

class ProjectView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):#type: ignore
        return Project.objects.filter(
            user=self.request.user,
            folder_id=self.kwargs["folder_pk"],   
        )

    def perform_create(self, serializer):
        user = self.request.user
        folder_id = self.kwargs["folder_pk"]

        # validate first
        serializer.is_valid(raise_exception=True)

        # generate default project name
        existing_count = Project.objects.filter(
            user=user,
            folder_id=folder_id
        ).count()
        default_name = f"Project-{existing_count + 1}"
        name = serializer.validated_data.get("name", default_name)

        # save  project first
        project = serializer.save(
            name=name,
            folder_id=folder_id,
            user=user,
        )

        # create the one-to-one grid
        Grid.objects.create(
            user=user,
            project=project
        )

        return project


    def get_serializer_class(self):#type: ignore
        if self.action == "project_names":
            return PartialProjectSerializer 
        return ProjectSerializer

    @action(methods=['get'], detail=False)
    def project_names(self, request, folder_pk=None):
        projects = self.get_queryset()
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)
