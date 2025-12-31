from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction


# models
from .models import Table, Column, Row, Cell
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
        table = Table.objects.filter(user=request.user, i=i).first()
        if not table:
            return Response({"error": "Not found"}, status=404)
        table.delete()
        return Response({"success": "Successfully deleted item"}, status=200)


class ColumnView(viewsets.ModelViewSet) :
    serializer_class = ColumnSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self): #type: ignore
        table_id = self.request.data.get("tableId") #type: ignore
        return Column.objects.filter(
            user = self.request.user,
            table_id = table_id

        )

    def perform_create(self, serializer):
        table_id = self.request.data.get("tableId") #type: ignore

        with transaction.atomic():
            total_columns = Column.objects.filter(
                table_id=table_id,
                user=self.request.user,
            ).count()


            column = serializer.save(
                table_id=table_id,
                user=self.request.user,
                index=total_columns + 1,  # 1-based
            )

            # create empty cells for every row
            rows = Row.objects.filter(
                table_id=table_id,
                user=self.request.user,
            )

            table = Table.objects.get(
                user=self.request.user,
                id=table_id,
            )

            Cell.objects.bulk_create([
                Cell(
                    user=self.request.user,
                    table=table,
                    row=row,
                    column=column,
                    columnIndex=column.index,
                    rowIndex=row.index,
                    text=""
                )
                for row in rows
            ])


    @action(detail=False, methods=["delete"], url_path="deleteColumnByIndex")
    def deleteColumn(self, request):
        index = request.data.get("index")
        table_id = request.data.get("tableId")

        if index is None or table_id is None:
            return Response(
                {"error": "index and tableId are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        with transaction.atomic():
            # delete the column
            deleted, _ = Column.objects.filter(
                user=request.user,
                table_id=table_id,
                index=index,
            ).delete()

            if deleted == 0:
                return Response(
                    {"error": "column not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            # reindex ALL remaining columns
            columns = Column.objects.filter(
                user=request.user,
                table_id=table_id
            ).order_by("index")

            for new_index, column in enumerate(columns, start=1):
                if column.index != new_index:
                    column.index = new_index
                    column.save(update_fields=["index"])

        return Response(status=status.HTTP_204_NO_CONTENT)


class RowView(viewsets.ModelViewSet):
    serializer_class = RowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self): #type: ignore
        table_id = self.request.data.get("tableId") #type: ignore
        return Row.objects.filter(
            user = self.request.user,
            table_id = table_id
        )   

    def perform_create(self, serializer):

        tableId = self.request.data.get("tableId") #type: ignore


        with transaction.atomic():
            # create the row
            total_rows = Row.objects.filter(
                table_id=tableId,
                user=self.request.user,
            ).count()

            row = serializer.save(
                user=self.request.user,
                index=total_rows + 1,  # 1-based
                table_id = tableId,
            )

            # create empty cells for every column
            columns = Column.objects.filter(
                user=self.request.user,
                table_id = tableId
            )

            table = Table.objects.get(
                user=self.request.user,
                id=tableId,
            )

            Cell.objects.bulk_create([
                Cell(
                    row=row,
                    user=self.request.user,
                    column=column,
                    columnIndex=column.index,
                    rowIndex=row.index,
                    text="",
                    table=table
                )
                for column in columns
            ])

    @action(detail=False, methods=["delete"], url_path="deleteRowByIndex")
    def deleteRow(self, request):
        index = request.data.get("index")
        table_id = request.data.get("tableId")

        if index is None or table_id is None:
            return Response(
                {"error": "index and tableId are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        with transaction.atomic():
            # delete the target row
            deleted, _ = Row.objects.filter(
                user=request.user,
                table_id=table_id,
                index=index,
            ).delete()

            if deleted == 0:
                return Response(
                    {"error": "row not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            # reindex remaining rows (1-based)
            rows = Row.objects.filter(
                user=request.user,
                table_id=table_id
            ).order_by("index")

            for new_index, row in enumerate(rows, start=1):
                if row.index != new_index:
                    row.index = new_index
                    row.save(update_fields=["index"])

        return Response(status=status.HTTP_204_NO_CONTENT)


class CellView(viewsets.ModelViewSet):
    serializer_class = CellSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):  # type: ignore
        
        table_id = self.request.query_params.get("tableId") #type: ignore
        print('table id : .', table_id)

        if not table_id:
            return Cell.objects.none()

        return Cell.objects.filter(
            user=self.request.user,
            table_id=table_id,
        )
