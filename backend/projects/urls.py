from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested.routers import NestedSimpleRouter
from .views import ProjectFolderView, ProjectView

# grid view (very hacky must fix)
from grid.views import GridView

# folder router (main)
router = SimpleRouter()
router.register("project_folders", ProjectFolderView, basename="project_folders")

# project router
projects_router = NestedSimpleRouter(router, "project_folders", lookup="folder")
projects_router.register("projects", ProjectView, basename="projects")

# Grid router
grid_router = NestedSimpleRouter(router, "project_folders", lookup="folder")
grid_router.register('grid', GridView, basename='grid')


urlpatterns = [
    path("", include(router.urls)),
    path("", include(projects_router.urls)),
    path("", include(grid_router.urls))
]
