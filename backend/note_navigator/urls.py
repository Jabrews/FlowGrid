from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

# views
from .views import NoteDirectoryViewset, NoteFolderViewSet, NoteViewSet, RawObjectViewSet 


# /note_directories/{directory_id}/folders/{folder_id}/notes/{note_id}/

noteDirectoryRouter = DefaultRouter()
noteDirectoryRouter.register('note_directories', NoteDirectoryViewset, basename='note_directories')

noteFolderRouter = NestedDefaultRouter(noteDirectoryRouter, 'note_directories', lookup='directory')
noteFolderRouter.register('folders', NoteFolderViewSet, basename='note_folders')

noteRouter = NestedDefaultRouter(noteFolderRouter, 'folders', lookup='folder')
noteRouter.register('notes', NoteViewSet, basename='notes')

# raw object
rawObjectRouter =  DefaultRouter()
rawObjectRouter.register('raw_objects', RawObjectViewSet, basename='raw_objects')

urlpatterns = [
   path('', include(noteDirectoryRouter.urls)),
   path('', include(noteFolderRouter.urls)),
   path('', include(noteRouter.urls)),
   path('', include(rawObjectRouter.urls))
    
]










