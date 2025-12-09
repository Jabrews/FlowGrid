from django.urls import path, include
from rest_framework.routers import DefaultRouter 

# views
from .views import TrackerView

router = DefaultRouter()
router.register('trackers', TrackerView, basename='trackers' )

urlpatterns = [
    path("", include(router.urls))
    
]