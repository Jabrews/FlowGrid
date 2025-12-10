from django.urls import path, include
from rest_framework.routers import DefaultRouter 

# views
from .views import TrackerView
from .track_obj_views.track_timer_obj_view import TrackObjTimerView 

trackerRouter= DefaultRouter()
trackerRouter.register('trackers', TrackerView, basename='trackers' )
trackObjTimerRouter = DefaultRouter()
trackObjTimerRouter.register('track_obj_timer', TrackObjTimerView, basename='trackers' )




urlpatterns = [
    path("", include(trackerRouter.urls)),
    path("", include(trackObjTimerRouter.urls))

    
]