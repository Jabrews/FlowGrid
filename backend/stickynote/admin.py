from django.contrib import admin

from .models import StickyNote, StickyNotePage, StickyNoteLine

admin.site.register(StickyNote)
admin.site.register(StickyNotePage)
admin.site.register(StickyNoteLine)