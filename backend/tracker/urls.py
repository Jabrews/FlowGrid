from django.urls import path, include
from rest_framework.routers import DefaultRouter 

# views
from .views import TrackerView

router = DefaultRouter()
router.register('tracker', TrackerView, basename='tracker' )

urlpatterns = [
    path("", include(router.urls))
    
]