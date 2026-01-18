from rest_framework import serializers

# models 
from .models import NoteDirectory, NoteFolder, Note, RawObject



class NoteDirectorySerializer(serializers.ModelSerializer) :
    grid_id = serializers.CharField(source='grid.id', read_only=True)
    folders = serializers.SerializerMethodField()

    class Meta :
        model = NoteDirectory
        fields = ['id', 'grid_id', 'folders']
        read_only_fields = ['id', 'grid_id', 'folders']

    def get_folders(self, obj):
        return NoteFolderSerializer(
            NoteFolder.objects.filter(note_directory=obj),
            many=True
        ).data
    
class NoteFolderSerializer(serializers.ModelSerializer) :
    note_directory_id = serializers.CharField(source='note_directory.id', read_only=True)
    notes = serializers.SerializerMethodField()

    class Meta :
        model = NoteFolder
        fields = ['id', 'note_directory_id', 'name', 'notes']
        read_only_fields = ['id', 'note_directory_id', 'notes',]

    def get_notes(self, obj) :
        note_qs = Note.objects.filter(
            note_folder_id = obj.id
        )
        return NotePartialSerializer(note_qs, many=True).data

        

class NoteSerializer(serializers.ModelSerializer) :
    note_folder_id = serializers.CharField(source='note_folder.id', read_only=True)

    class Meta :
        model = Note
        fields = ['id', 'note_folder_id', 'title', 'last_used']
        read_only_fields = ['id', 'note_folder_id',  'last_used']
        

# used for quick viewing on note folder fields
#  mainly to leave out text for large markup payloads
class NotePartialSerializer(serializers.ModelSerializer):
    note_folder_id = serializers.CharField(source='note_folder.id', read_only=True)

    class Meta :
        model = Note
        fields = ['id', 'note_folder_id', 'title']
        read_only_fields = ['id', 'note_folder_id']

class RawObjectSerializer(serializers.ModelSerializer) :
    note_id = serializers.CharField(source='note.id', read_only=True)    
    text = serializers.CharField(
        required=False,
        allow_blank=True,
        trim_whitespace=False,
    )    
    
    class Meta :
        model = RawObject
        fields = ['id', 'lineNum', 'text', 'note_id']
        read_only_fields = ['note_id', 'id'] 