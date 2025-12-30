from rest_framework import serializers

from .models import StickyNote, StickyNotePage, StickyNoteLine

class StickyNoteSerializer (serializers.ModelSerializer) :
    user = serializers.CharField(source="user.username", read_only=True)
    grid = serializers.CharField(source='grid.id', read_only=True)


    class Meta : 
        model = StickyNote 
        fields = ['i', 'type', 'created', 'grid', 'user', 'id']
        read_only_fields = ["user", "grid", 'id']

# source is decided in modal

class StickyNotePageSerializer(serializers.ModelSerializer):
    stickyNoteId = serializers.PrimaryKeyRelatedField(
        source="sticky_note",
        read_only=True
    )

    class Meta:
        model = StickyNotePage
        fields = ["id", "stickyNoteId", 'title']
        read_only_fields = ["id", "stickyNoteId"]

class StickyNoteLineSerializer(serializers.ModelSerializer) :
   stickyNotePageId = serializers.PrimaryKeyRelatedField(
       source='sticky_note_page',
       read_only=True,
   ) 

   class Meta :
        model = StickyNoteLine
        fields = ['id', 'line_symbol', 'stickyNotePageId', 'text']
