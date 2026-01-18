import { create } from "zustand";

type NoteDirectoryInfoStore = {
    noteDirectoryId : number,
    setNoteDirectoryId : (newDirectoryId : number) => void
}

const useNoteDirectoryInfoStore = create<NoteDirectoryInfoStore>((set) => ({
    noteDirectoryId : 0,
    setNoteDirectoryId : (newNoteDirectoryId : number) => set((s) => ({
        ...s,
        noteDirectoryId : newNoteDirectoryId
    }))
}))

export const useNoteDirectoryId = () =>
    useNoteDirectoryInfoStore((s) => s.noteDirectoryId)

export const useSetNoteDirectoryId = () =>
    useNoteDirectoryInfoStore((s) => s.setNoteDirectoryId)