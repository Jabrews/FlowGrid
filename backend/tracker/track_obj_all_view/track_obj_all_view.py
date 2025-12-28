from rest_framework import viewsets 
from rest_framework.decorators import action
from rest_framework.response import Response

# models
from tracker.models import TrackObjTimer

from timers.models import Timers


# serializer
from tracker.serializers import TrackObjTimerSerializer

class AllTrackObjView(viewsets.ViewSet):

    @action(
        detail=False,
        methods=["get"],
        url_path=r"grid/(?P<gridId>[^/.]+)"
    )
    def list_by_grid(self, request, gridId=None):
        qs = TrackObjTimer.objects.filter(
            user=request.user,
            grid_id=gridId
        )
        serializer = TrackObjTimerSerializer(qs, many=True)
        return Response(serializer.data)


    @action(
        detail=False,
        methods=["get"],
        url_path=r"by-item/(?P<gridItemType>[^/.]+)/(?P<i>[^/.]+)"
    )
    def find_track_objs_by_item_i(self, request, gridItemType=None, i=None):

        if i is None or gridItemType is None:
            return Response([])

        i = i.strip()
        gridItemType = gridItemType.strip()

        lookup_field = "trackerI" if gridItemType == "tracker" else "gridItemI"
        filter_kwargs = {
            "user": request.user,
            lookup_field: i,
        }

        results = []

        timer_qs = TrackObjTimer.objects.filter(**filter_kwargs)
        if timer_qs.exists():
            results.extend(
                TrackObjTimerSerializer(timer_qs, many=True).data
            )


        # example_qs = ExampleTrackObj.objects.filter(**filter_kwargs)
        # if example_qs.exists():
        #     results.extend(
        #         ExampleTrackObjSerializer(example_qs, many=True).data
        #     )

        return Response(results)

