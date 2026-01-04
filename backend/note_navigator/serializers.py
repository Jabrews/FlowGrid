from rest_framework import serializers

# models 
from .models import NoteDirectory, NoteFolder, Note



class NoteDirectorySerializer(serializers.ModelSerializer) :
    grid_id = serializers.CharField(source='grid.id', read_only=True)

    class Meta :
        model = NoteDirectory,
        fields = ['id', 'grid_id']
        read_only_fields = ['id', 'grid_id']
    
class NoteFolderSerializer(serializers.ModelSerializer) :
    note_directory_id = serializers.CharField(source='note_directory.id', read_only=True)

    class Meta :
        model = NoteFolder,
        fields = ['id', 'note_directory_id', 'name']
        read_only_fields = ['id', 'note_directory_id']
        

class NoteSerializer(serializers.ModelSerializer) :
    note_folder_id = serializers.CharField(source='note_folder.id', read_only=True)

    class Meta :
        model = Note,
        fields = ['id', 'note_folder_id', 'title', 'last_used', 'raw_text']
        read_only_fields = ['id', 'note_folder_id']
        


