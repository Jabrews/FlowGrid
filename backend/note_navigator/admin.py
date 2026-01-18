from django.contrib import admin

from .models import NoteDirectory, NoteFolder, Note, RawObject

admin.site.register(NoteDirectory)
admin.site.register(NoteFolder)
admin.site.register(Note)
admin.site.register(RawObject)


