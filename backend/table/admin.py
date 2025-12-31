from django.contrib import admin

from .models import Table, Column, Row, Cell


admin.site.register(Table)
admin.site.register(Cell)
admin.site.register(Column)
admin.site.register(Row)


