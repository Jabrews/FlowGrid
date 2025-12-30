from django.shortcuts import render
from rest_framework import viewsets, permissions, throttling
from rest_framework.decorators import action
from rest_framework.response import Response

# models
from .models import StickyNote, StickyNotePage, StickyNoteLine
from grid.models import LayoutItem
from .serializers import StickyNoteSerializer, StickyNotePageSerializer, StickyNoteLineSerializer


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

class StickyNoteLineView(viewsets.ModelViewSet) :
    serializer_class = StickyNoteLineSerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]

    def get_queryset(self): #type: ignore
        page_id = self.kwargs.get("page_pk")

        print('getting items for : ', page_id)
        return StickyNoteLine.objects.filter(
            user=self.request.user,
            sticky_note_page_id=page_id,
        )

    def perform_create(self, serializer):
        page_id = self.kwargs["page_pk"]

        serializer.save(
            sticky_note_page_id=page_id,
            user=self.request.user
        )

    @action(detail=True, methods=['patch'], url_path='changeIconType')
    def change_icon_type(self, request, sticky_pk=None, page_pk=None, pk=None):

        line = StickyNoteLine.objects.filter(
            id=pk,
            sticky_note_page_id=page_pk,
            user=request.user
        ).first()

        if not line:
            return Response({"error": "Not found"}, status=404)

        # cycle icon type
        current_icon = line.line_symbol

        if current_icon == 'checkbox_filled':
            line.line_symbol = 'checkbox_empty'
        elif current_icon == 'checkbox_empty':
            line.line_symbol = 'dash'
        elif current_icon == 'dash':
            line.line_symbol = 'bullet'
        elif current_icon == 'bullet':
            line.line_symbol = 'none'
        elif current_icon == 'none':
            line.line_symbol = 'checkbox_filled'

        # save changes
        line.save()

        return Response({"success": "Successfully changed item icon type"}, status=200)





        # return Response(self.get_serializer(line).data)


        # new_type = request.data.get("line_symbol")
        # if not new_type:
        #     return Response({"error": "Missing line_symbol"}, status=400)

        # line.line_symbol = new_type
        # line.save()

        # return Response(self.get_serializer(line).data)




