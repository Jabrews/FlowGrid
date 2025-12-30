from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import TableView, ColumnView, RowView, CellView

# tables
table_router = DefaultRouter()
table_router.register(r'tables', TableView, basename='tables')

# columns
column_router = DefaultRouter()
column_router.register(r'columns', ColumnView, basename='columns')

# rows
row_router = DefaultRouter()
row_router.register(r'rows', RowView, basename='rows')

# cells
cell_router = DefaultRouter()
cell_router.register(r'cells', CellView, basename='cells')

urlpatterns = [
    path('', include(table_router.urls)),
    path('', include(column_router.urls)),
    path('', include(row_router.urls)),
    path('', include(cell_router.urls)),
]
