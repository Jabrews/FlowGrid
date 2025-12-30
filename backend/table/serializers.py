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
        models = Column
        fields = ['id', 'index']
        read_only_fields = ['id']

class RowSerializer(serializers.ModelSerializer)  : 

    class Meta :
        models = Row 
        fields = ['id', 'index']
        read_only_fields = ['id']



class CellSerializer (serializers.ModelSerializer) :
    tableId = serializers.CharField(source='table.id', read_only=True)

    class Meta :
        models = Cell
        fields = ['id', 'text', 'tableId']
        read_only_fields = ['id', 'tableId']
        constraints = [
    ]
