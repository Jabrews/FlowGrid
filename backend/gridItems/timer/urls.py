from django.urls import path, include 
from rest_framework.routers import DefaultRouter 

# views
from .views import TimerView

router = DefaultRouter()
router.register('timers', TimerView, basename='timers')

urlpatterns = [
    path("", include(router.urls))
]
