from rest_framework import serializers

from .models import StickyNote, StickyNotePage

class StickyNoteSerializer (serializers.ModelSerializer) :
    user = serializers.CharField(source="user.username", read_only=True)
    grid = serializers.CharField(source='grid.id', read_only=True)


    class Meta : 
        model = StickyNote 
        fields = ['i', 'type', 'created', 'grid', 'user', 'id']
        read_only_fields = ["user", "grid", 'id']

class StickyNotePageSerializer(serializers.ModelSerializer):
    stickyNoteId = serializers.PrimaryKeyRelatedField(
        source="sticky_note",
        read_only=True
    )

    class Meta:
        model = StickyNotePage
        fields = ["id", "stickyNoteId", 'title']
        read_only_fields = ["id", "stickyNoteId"]
