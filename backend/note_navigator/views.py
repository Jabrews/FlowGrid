from django.shortcuts import render, get_object_or_404

from rest_framework import viewsets, status 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework.decorators import action
from django.db.models import F
from django.db import transaction


# models
from .models import NoteDirectory, NoteFolder, Note, RawObject
from grid.models import Grid

#serializer
from .serializers import NoteDirectorySerializer, NoteFolderSerializer, NoteSerializer, RawObjectSerializer

class NoteDirectoryViewset(viewsets.ModelViewSet):
    queryset = NoteDirectory.objects.all()
    serializer_class = NoteDirectorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):#type:ignore

        grid_id = self.request.query_params.get("grid_id")#type:ignore


        if not grid_id:
            raise ValidationError({"error": "query param grid_id not found"})

        qs = NoteDirectory.objects.filter(
            user=self.request.user,
            grid_id=grid_id,
        )

        if not qs.exists():
            raise NotFound("note directory not found")

        return qs

    def perform_create(self, serializer):
        grid_id = self.request.data.get("grid_id")#type:ignore


        if not grid_id:
            raise ValidationError({"error": "grid_id required"})

        grid = get_object_or_404(
            Grid,
            id=grid_id,
            user=self.request.user,
        )

        note_dir, created = NoteDirectory.objects.get_or_create(
            user=self.request.user,
            grid=grid,
            defaults=serializer.validated_data,
        )

        if not created:
            raise ValidationError({"error": "note directory already exists"})

        serializer.instance = note_dir


class NoteFolderViewSet(viewsets.ModelViewSet):
    queryset = NoteFolder.objects.all()
    serializer_class = NoteFolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):#type:ignore

        directory_id = self.kwargs.get("directory_pk")

        if not directory_id:
            raise ValidationError({"error": "directory_pk not found"})

        return NoteFolder.objects.filter(
            note_directory_id=directory_id,
            user=self.request.user,
        )

    def perform_create(self, serializer):
        note_dir_id = self.kwargs.get("directory_pk")

        noteDir = get_object_or_404(
            NoteDirectory,
            id=note_dir_id,
            user=self.request.user,
        )

        count = NoteFolder.objects.filter(
            note_directory=noteDir,
            user = self.request.user
        ).count() + 1

        serializer.save(
            user=self.request.user,
            name=f"folder-{count}",
            note_directory=noteDir,
        )


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):#type:ignore

        folder_id = self.kwargs.get("folder_pk")

        if not folder_id:
            raise ValidationError({"error": "folder_pk not found"})

        return Note.objects.filter(
            note_folder_id=folder_id,
            user=self.request.user,
        )

    def perform_create(self, serializer):
        folder_id = self.kwargs.get("folder_pk")

        folder = get_object_or_404(
            NoteFolder,
            id=folder_id,
            user=self.request.user,
        )

        count = Note.objects.filter(
            note_folder=folder,
            user=self.request.user
        ).count() + 1


        serializer.save(
            title=f"note-{count}",
            note_folder=folder,
            user=self.request.user
        )


class RawObjectViewSet(viewsets.ModelViewSet):
    queryset = RawObject.objects.all()
    serializer_class = RawObjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):#type:ignore
        return RawObject.objects.filter(
            user=self.request.user
        ).order_by("lineNum")

    def perform_create(self, serializer):
        lineNum = self.request.data.get("lineNum")#type:ignore
        noteId = self.request.data.get("noteId")#type:ignore

        note = get_object_or_404(
            Note,
            id=noteId,
            user=self.request.user,
        )

        if RawObject.objects.filter(
            user=self.request.user,
            note=note,
            lineNum=lineNum,
        ).exists():
            raise ValidationError({"error": "raw object already exists"})

        serializer.save(
            lineNum=lineNum,
            user=self.request.user,
            note=note,
        )

    @action(detail=False, methods=["get"], url_path="get_based_on_page_id")
    def get_based_on_page_id(self, request):
        note_id = request.query_params.get("noteId")

        note = get_object_or_404(
            Note,
            id=note_id,
            user=request.user,
        )

        raw_objects = RawObject.objects.filter(
            note=note,
            user=request.user,
        ).order_by("lineNum")

        if not raw_objects.exists():
            raw_obj = RawObject.objects.create(
                note=note,
                lineNum=1,
                text="",
                user=request.user,
            )
            return Response(RawObjectSerializer([raw_obj], many=True).data)

        return Response(RawObjectSerializer(raw_objects, many=True).data)

    @action(detail=False, methods=["post"], url_path="split_raw_object")
    def split_raw_object(self, request):
        lineNum = request.data.get("lineNum")
        rawObjectId = request.data.get("rawObjectId")
        noteId = request.data.get("noteId")
        overloadedText = request.data.get("overloadedText", "")
        rawObjectText = request.data.get("rawObjectText", "")

        note = get_object_or_404(
            Note,
            id=noteId,
            user=request.user,
        )

        selectedRawObject = get_object_or_404(
            RawObject,
            id=rawObjectId,
            lineNum=lineNum,
            user=request.user,
            note=note,
        )

        with transaction.atomic():
            RawObject.objects.filter(
                note=note,
                user=request.user,
                lineNum__gt=selectedRawObject.lineNum,
            ).update(
                lineNum=F("lineNum") + 1
            )

            selectedRawObject.text = rawObjectText
            selectedRawObject.save()

            RawObject.objects.create(
                note=note,
                lineNum=selectedRawObject.lineNum + 1,
                text=overloadedText,
                user=request.user,
            )

        return Response({"status": "ok"})

    @action(detail=False, methods=["post"], url_path="create_under_current")
    def create_under_current(self, request):
        noteId = request.data.get("noteId")
        lineNum = request.data.get("lineNum")

        try:
            lineNum = int(lineNum)
        except (TypeError, ValueError):
            return Response({"error": "invalid lineNum"}, status=400)

        with transaction.atomic():
            # lock the parent row so inserts for this note cannot race
            note = get_object_or_404(
                Note.objects.select_for_update(),
                id=noteId,
                user=request.user,
            )

            qs = RawObject.objects.filter(note=note, user=request.user)

            # 1) get current raw obj
            current = qs.filter(lineNum=lineNum).first()
            if not current:
                return Response({"error": "current line does not exist"}, status=400)

            insert_at = lineNum + 1

            # 2) get next raw obj
            next_obj = qs.filter(lineNum=insert_at).first()

            # 3) if next exists, shift it + everything after it
            if next_obj:
                qs.filter(lineNum__gte=insert_at).update(
                    lineNum=F("lineNum") + 1
                )

            # 4) create the new raw obj at insert_at
            new_obj = RawObject.objects.create(
                note=note,
                user=request.user,
                lineNum=insert_at,
                text="",
            )

        return Response({"status": "ok", "createdLineNum": new_obj.lineNum})


    @action(detail=False, methods=["delete"], url_path="delete_raw_object")
    def delete_raw_object(self, request):
        noteId = request.data.get("noteId")
        rawObjectId = request.data.get("rawObjectId")

        note = get_object_or_404(
            Note,
            id=noteId,
            user=request.user,
        )

        selectedRawObject = get_object_or_404(
            RawObject,
            id=rawObjectId,
            user=request.user,
            note=note,
        )

        with transaction.atomic():
            deleted_line = selectedRawObject.lineNum
            selectedRawObject.delete()
            RawObject.objects.filter(
                note=note, user=request.user, lineNum__gt=deleted_line
            ).update(lineNum=F("lineNum") - 1)

        return Response({"status": "ok"})

    @action(detail=False, methods=["patch"], url_path="delete_overpopulated_raw_obj")
    def delete_overpopulated_raw_obj(self, request):
        lineNum = request.data.get("lineNum")
        noteId = request.data.get("noteId")
        newActiveText = request.data.get("newActiveText")
        newPriorText = request.data.get("newPriorText")

        note = get_object_or_404(
            Note,
            id=noteId,
            user=request.user,
        )

        activeRawObj = get_object_or_404(
            RawObject,
            user=request.user,
            note=note,
            lineNum=lineNum,
        )

        priorRawObj = get_object_or_404(
            RawObject,
            user=request.user,
            note=note,
            lineNum=lineNum - 1,
        )

        with transaction.atomic():
            priorRawObj.text = newPriorText
            priorRawObj.save()

            if (newActiveText or "").strip() == "":
                activeRawObj.delete()
                RawObject.objects.filter(
                    note=note,
                    user=request.user,
                    lineNum__gt=lineNum,
                ).update(
                    lineNum=F("lineNum") - 1
                )
            else:
                activeRawObj.text = newActiveText
                activeRawObj.save()

        return Response({"status": "ok"})