from rest_framework import serializers
from .models import Table, Column, Row, Cell


class TableSerializer(serializers.ModelSerializer) :
    user = serializers.CharField(source="user.username", read_only=True)
    grid = serializers.CharField(source='grid.id', read_only=True)

    class Meta :
        model = Table
        fields = ['id', 'grid', 'user', 'name']
        read_only_fields = ['id', 'user', 'grid']

class ColumnSerializer(serializers.ModelSerializer)  : 

    class Meta :
        model = Column
        fields = ['id', 'index']
        read_only_fields = ['id', 'index']

class RowSerializer(serializers.ModelSerializer)  : 

    class Meta :
        model = Row 
        fields = ['id', 'index']
        read_only_fields = ['id', 'index']

class CellSerializer (serializers.ModelSerializer) :
    tableId = serializers.CharField(source='table.id', read_only=True)
    columnIndex = serializers.CharField(source='column.index', read_only=True)
    rowIndex = serializers.CharField(source='row.index', read_only=True)

    class Meta :
        model = Cell
        fields = ['id', 'text', 'tableId', 'columnIndex', 'rowIndex']
        read_only_fields = ['id', 'tableId', 'columnIndex', 'rowIndex']
