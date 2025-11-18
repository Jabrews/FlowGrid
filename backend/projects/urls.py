from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested.routers import NestedSimpleRouter
from .views import ProjectFolderView, ProjectView
from grid.views import GridView

## get these out of urls here and into main

# base: /project_folders/
router = SimpleRouter()
router.register("project_folders", ProjectFolderView, basename="project_folders")

# /project_folders/<folder_pk>/projects/
projects_router = NestedSimpleRouter(router, "project_folders", lookup="folder")
projects_router.register("projects", ProjectView, basename="projects")

# /project_folders/<folder_pk>/projects/<project_pk>/grid/
grid_router = NestedSimpleRouter(projects_router, "projects", lookup="project")
grid_router.register("grid", GridView, basename="grid")

urlpatterns = [
    path("", include(router.urls)),
    path("", include(projects_router.urls)),
    path("", include(grid_router.urls)),
]
