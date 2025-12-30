from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

# models
from .models import Table, Cell
from grid.models import LayoutItem

# serializers
from .serializers import TableSerializer, CellSerializer, ColumnSerializer, RowSerializer

class TableView(viewsets.ModelViewSet) :
    serializer_class =  TableSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self): #type: ignore
        return Table.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
         
        existTable= Table.objects.filter(
            i=self.request.data.get("i"), #type: ignore
            user=self.request.user
        ).first()


        existingLayout = LayoutItem.objects.filter(
            i=self.request.data.get("i"), #type: ignore
            user=self.request.user
        ).first()

        if existTable or not existingLayout:
            return 

        total_tables = Table.objects.filter(
            user = self.request.user,
            grid_id=self.request.data.get("gridId"),#type: ignore
        ).count()

        customName = f"table-{total_tables+ 1}"

        serializer.save(
            grid_id=self.request.data.get("gridId"),#type: ignore
            i=self.request.data.get("i"),#type: ignore
            user=self.request.user,
            name=customName,
        )


    @action(detail=False, methods=['get'], url_path='findGridItemByI/(?P<i>[^/.]+)')
    def findGridItemByI(self, request, i=None):
        table = Table.objects.filter(user=request.user, i=i).first()
        if not table:
            return Response({"error": "Not found"}, status=404)

        return Response(self.get_serializer(table).data)

    @action(detail=False, methods=['delete'], url_path='deleteGridItemByI/(?P<i>[^/.]+)')
    def deleteGridItemByI(self, request, i=None):
        print('sticky : ', i)
        table = Table.objects.filter(user=request.user, i=i).first()
        if not table:
            return Response({"error": "Not found"}, status=404)
        table.delete()
        return Response({"success": "Successfully deleted item"}, status=200)


class ColumnView(viewsets.ModelViewSet) :
    serializer_class = ColumnSerializer
    permission_classes = [permissions.IsAuthenticated]

class RowView(viewsets.ModelViewSet) :
    serializer_class = RowSerializer 
    permission_classes = [permissions.IsAuthenticated]



class CellView (viewsets.ModelViewSet) :
    serializer_class = CellSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self): #type: ignore
        return Cell.objects.filter(
            user=self.request.user
        )
    

