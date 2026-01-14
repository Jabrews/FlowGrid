from django.shortcuts import render, get_object_or_404

from rest_framework import viewsets, status 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
# models
from .models import NoteDirectory, NoteFolder, Note
from grid.models import Grid

#serializer
from .serializers import NoteDirectorySerializer, NoteFolderSerializer, NoteSerializer

class NoteDirectoryViewset(viewsets.ModelViewSet) :
    queryset = NoteDirectory
    serializer_class = NoteDirectorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):  # type: ignore
        grid_id = self.request.query_params.get("grid_id")# type: ignore

        if not grid_id:
            raise ValidationError({"error": "query param grid_id not found"})

        qs = NoteDirectory.objects.filter(
            user=self.request.user,
            grid_id=grid_id,
        )

        if not qs.exists():
            raise NotFound("note directory not found")

        return qs




    def perform_create(self, serializer):
        grid_id = self.request.data.get("grid_id")#type: ignore

        if not grid_id:
            raise ValidationError({"error": "grid_id required"})

        grid = Grid.objects.get(
            user=self.request.user,
            id=grid_id
        )

        note_dir, created = NoteDirectory.objects.get_or_create(
            user=self.request.user,
            grid=grid,
            defaults=serializer.validated_data,
        )

        if not created:
            raise ValidationError({"error": "note directory already exists"})




class NoteFolderViewSet(viewsets.ModelViewSet) :
    queryset = NoteFolder 
    serializer_class = NoteFolderSerializer 
    permission_classes = [IsAuthenticated]

    def get_queryset(self): #type: ignore
        directory_id = self.kwargs.get('directory_pk')

        if not directory_id:
            return Response({'error' : 'query param directory_id not found'}, status=status.HTTP_400_BAD_REQUEST)

        return NoteFolder.objects.filter(
            note_directory_id = directory_id ,
        )            


    def perform_create(self, serializer):
        note_dir_id = self.kwargs.get("directory_pk")

        if not note_dir_id:
            raise ValidationError({"error": "missing directory_pk"})

        noteDir = get_object_or_404(
            NoteDirectory,
            id=note_dir_id,
        )
        
        if not noteDir:
            raise ValidationError({"error": "could not find note dir"})

        count = NoteFolder.objects.filter(
            note_directory=noteDir,
        ).count() + 1

        serializer.save(
            name=f"folder-{count}",
            note_directory=noteDir,
        )
 

            
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): #type: ignore
        folder_id = self.kwargs.get('folder_pk')

        if not folder_id:
            return Response({'error' : 'query param folder_id not found'}, status=status.HTTP_400_BAD_REQUEST)

        return Note.objects.filter(
            note_folder_id=folder_id,
        )            

    def perform_create(self, serializer):
        folder_id = self.kwargs.get('folder_pk')

        if not folder_id:
            raise ValidationError({"error": "missing folder id query param "})


        folder = get_object_or_404(
            NoteFolder,
            id=folder_id 
        )        

        count = Note.objects.filter(
            note_folder=folder,
        ).count() + 1

        serializer.save(
            title=f"note-{count}",
            note_folder=folder,
        )






    
