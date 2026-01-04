from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response

# models
from .models import NoteDirectory, NoteFolder, Note

#serializer
from .serializers import NoteDirectorySerializer, NoteFolderSerializer, NoteSerializer

class NoteDirectoryViewset(viewsets.ModelViewSet) :
    queryset = NoteDirectory
    serializer_class = NoteDirectorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): #type: ignore
        grid_id = self.request.query_params.get("grid_id")#type: ignore

        if not grid_id:
            return Response({'error' : 'query param grid_id not found'}, status=status.HTTP_400_BAD_REQUEST)

        return  NoteDirectory.objects.get(
            user = self.request.user,
            grid_id = grid_id,
        ) 


class NoteFolderViewSet(viewsets.ModelViewSet) :
    queryset = NoteFolder 
    serializer_class = NoteFolderSerializer 
    permission_classes = [IsAuthenticated]

    def get_queryset(self): #type: ignore
        directory_id = self.kwargs.get('directory_pk')

        if not directory_id:
            return Response({'error' : 'query param directory_id not found'}, status=status.HTTP_400_BAD_REQUEST)

        return NoteFolder.objects.filter(
            user=self.request.user,
            note_directory_id = directory_id ,
        )            
            
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note,
    serializer_class = NoteSerializer,
    permission_classes = [IsAuthenticated]

    def get_queryset(self): #type: ignore
        folder_id = self.kwargs.get('folder_pk')

        if not folder_id:
            return Response({'error' : 'query param folder_id not found'}, status=status.HTTP_400_BAD_REQUEST)

        return NoteFolder.objects.filter(
            user=self.request.user,
            note_folder_id=folder_id,
        )            





    
