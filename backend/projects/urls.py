from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import ProjectFolderView, ProjectView 

router = DefaultRouter()
router.register('project_folders', ProjectFolderView, basename='project_folders')
router.register(r'folders/(?P<folder_id>\d+)/projects', ProjectView, basename='folder-projects')


urlpatterns = [
    path('', include(router.urls))
]


