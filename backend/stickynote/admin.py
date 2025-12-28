from django.contrib import admin

from .models import StickyNote, StickyNotePage

admin.site.register(StickyNote)
admin.site.register(StickyNotePage)