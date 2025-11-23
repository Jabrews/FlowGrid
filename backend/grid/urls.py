from django.urls import path

# viewsets
from .views import LayoutListView, LayoutDetailView

# IF looking for GRID, its in main app in nested router

urlpatterns = [
    path("layout/<int:grid_id>/", LayoutListView.as_view(), name="layout-list"),
    path("layout/<int:grid_id>/<int:pk>/", LayoutDetailView.as_view(), name="layout-detail",)
]