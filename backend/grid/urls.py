from django.urls import path

# viewsets
from .views import LayoutView

# IF looking for GRID, its in main app in nested router

urlpatterns = [
    path("layout/<int:grid_id>/", LayoutView.as_view(), name="layout-list"),
]