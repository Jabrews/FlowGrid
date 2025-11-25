from rest_framework import viewsets, permissions 
from rest_framework.decorators import action
from rest_framework.response import Response

# model
from .models import Timer
# serializer
from .serializer import TimerSerializer


class TimerView(viewsets.ModelViewSet):
    serializer_class = TimerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):#type: ignore
        return Timer.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
         
        # Check if timer already exists
        existing = Timer.objects.filter(
            i=self.request.data.get("i"), #type: ignore
            user=self.request.user
        ).first()

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