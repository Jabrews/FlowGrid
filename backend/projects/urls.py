from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested.routers import NestedSimpleRouter
from .views import ProjectFolderView, ProjectView

# main router
router = SimpleRouter()
router.register("project_folders", ProjectFolderView, basename="project_folders")

# nested router
projects_router = NestedSimpleRouter(router, "project_folders", lookup="folder")
projects_router.register("projects", ProjectView, basename="projects")

urlpatterns = [
    path("", include(router.urls)),
    path("", include(projects_router.urls)),
]
