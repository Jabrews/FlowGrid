from rest_framework import viewsets, permissions , throttling
from rest_framework.decorators import action
from rest_framework.response import Response

# model
from .models import Timer
from grid.models import LayoutItem
# serializer
from .serializer import TimerSerializer


class TimerView(viewsets.ModelViewSet):
    serializer_class = TimerSerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]

    def get_queryset(self):#type: ignore
        return Timer.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
         
        # Check if timer already exists
        existingTimer = Timer.objects.filter(
            i=self.request.data.get("i"), #type: ignore
            user=self.request.user
        ).first()


        existingLayout = LayoutItem.objects.filter(
            i=self.request.data.get("i"), #type: ignore
            user=self.request.user
        ).first()

        if existingTimer or not existingLayout:
            return 


        serializer.save(
            grid_id=self.request.data.get("gridId"),#type: ignore
            i=self.request.data.get("i"),#type: ignore
            user=self.request.user
        )

    @action(detail=False, methods=['get'], url_path='findGridItemByI/(?P<i>[^/.]+)')
    def findGridItemByI(self, request, i=None):
        timer = Timer.objects.filter(user=request.user, i=i).first()
        if not timer:
            return Response({"error": "Not found"}, status=404)

        return Response(self.get_serializer(timer).data)

    @action(detail=False, methods=['delete'], url_path='deleteGridItemByI/(?P<i>[^/.]+)')
    def deleteGridItemByI(self, request, i=None):
        timer = Timer.objects.filter(user=request.user, i=i).first()
        if not timer:
            return Response({"error": "Not found"}, status=404)

        timer.delete()
        return Response({"success": "Successfully deleted item"}, status=200)
