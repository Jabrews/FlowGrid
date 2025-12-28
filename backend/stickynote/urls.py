from django.urls import include, path
from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework.routers import DefaultRouter

# views
from .views import StickyNoteView, StickyNotePageView

router = DefaultRouter()
router.register("sticky_notes", StickyNoteView, basename="sticky-note")

## /sticky_note/{sticky_id}/pages/{page_id}/lines
sticky_router = NestedDefaultRouter(router, "sticky_notes", lookup="sticky")
sticky_router.register(
    "pages",
    StickyNotePageView,
    basename="sticky-pages"
)

urlpatterns = [
    path("", include(router.urls)),
    path("", include(sticky_router.urls)),
]