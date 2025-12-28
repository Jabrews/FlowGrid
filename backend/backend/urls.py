from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested.routers import NestedSimpleRouter

from projects.views import ProjectFolderView, ProjectView
from grid.views import GridView


## PROJECT, GRID

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
    # admin
    path('admin/', admin.site.urls),
    # auth
    path("api/", include("accounts.urls")),
    # projects
    path("api/", include(router.urls)),
    path("api/", include(projects_router.urls)),
    # grid, layout 
    path("api/", include(grid_router.urls)),
    path('api/', include('grid.urls')),
    # gridItems
    path("api/", include('timers.urls')),
    path("api/", include('tracker.urls')),
    path("api/", include("stickynote.urls")) 

]
