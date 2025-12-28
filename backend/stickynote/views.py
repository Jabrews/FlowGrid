from django.shortcuts import render
from rest_framework import viewsets, permissions, throttling
from rest_framework.decorators import action
from rest_framework.response import Response

# models
from .models import StickyNote, StickyNotePage 
from grid.models import LayoutItem
from .serializers import StickyNoteSerializer, StickyNotePageSerializer

class StickyNoteView(viewsets.ModelViewSet) :
    serializer_class = StickyNoteSerializer
    permission_classes =  [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]

    def get_queryset(self):#type: ignore
        return StickyNote.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
         
        existingStickyNote = StickyNote.objects.filter(
            i=self.request.data.get("i"), #type: ignore
            user=self.request.user
        ).first()

        existingLayout = LayoutItem.objects.filter(
            i=self.request.data.get("i"), #type: ignore
            user=self.request.user
        ).first()

        if existingStickyNote or not existingLayout:
            return 

        serializer.save(
            grid_id=self.request.data.get("gridId"),#type: ignore
            i=self.request.data.get("i"),#type: ignore
            user=self.request.user
        )

    @action(detail=False, methods=['get'], url_path='findGridItemByI/(?P<i>[^/.]+)')
    def findGridItemByI(self, request, i=None):
        sticky = StickyNote.objects.filter(user=request.user, i=i).first()
        if not sticky:
            return Response({"error": "Not found"}, status=404)

        return Response(self.get_serializer(sticky).data)

    @action(detail=False, methods=['delete'], url_path='deleteGridItemByI/(?P<i>[^/.]+)')
    def deleteGridItemByI(self, request, i=None):
        print('sticky : ', i)
        sticky = StickyNote.objects.filter(user=request.user, i=i).first()
        if not sticky:
            return Response({"error": "Not found"}, status=404)
        sticky.delete()
        return Response({"success": "Successfully deleted item"}, status=200)




    
class StickyNotePageView(viewsets.ModelViewSet) :
    serializer_class = StickyNotePageSerializer
    permission_classes =  [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]

    def get_queryset(self):#type: ignore
        sticky_id = self.kwargs.get("sticky_pk")

        return StickyNotePage.objects.filter(
            sticky_note_id=sticky_id,
            user=self.request.user
        )

    def perform_create(self, serializer):
        sticky_id = self.kwargs["sticky_pk"]

        serializer.save(
            sticky_note_id=sticky_id,
            user=self.request.user
        )




