import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ActiveNote = {
    title: string
    noteId: number
    parentFolderId: number
}

type ActiveNoteStore = {
    activeNotes: ActiveNote[]
    setActiveNotes: (newNotes: ActiveNote[]) => void
    deleteActiveNote: (noteId: number) => void
    deleteByFolderId : (folderId : number) => void
    addActiveNote: (note: ActiveNote) => void
    findActiveStatus : (noteId : number) => boolean
    changeActiveNoteName : (noteId : number, noteName : string) => void 
}

const useActiveNoteStore = create<ActiveNoteStore>()(
    persist(
        (set, get) => ({
            activeNotes: [],
            setActiveNotes: (newNotes) =>
                set(() => ({
                    activeNotes: newNotes
                })),

            deleteActiveNote: (noteId) =>
                set((s) => ({
                    activeNotes: s.activeNotes.filter(
                        (note) => note.noteId !== noteId
                    )
                })),
            deleteByFolderId : (folderId) => 
                set((s) => ({
                    activeNotes: s.activeNotes.filter(
                        (note) => note.parentFolderId !== folderId
                    )
                })),
            addActiveNote: (newNote) =>
                set((s) => ({
                    activeNotes: [...s.activeNotes, newNote]
                })),
            findActiveStatus: (noteId) => {
                return get().activeNotes.some(
                    (note) => note.noteId === noteId
                )
            },
            changeActiveNoteName: (noteId, newName) =>
                set((s) => ({
                    activeNotes: s.activeNotes.map((note : ActiveNote) =>
                        note.noteId == noteId
                            ? { ...note, title: newName }
                            : note
                    )
                })),
        }),
        {
            name: 'active-note-store', // localStorage key
        }
    )
)


// hooks
export const useActiveNotes = () =>
    useActiveNoteStore((s) => s.activeNotes)

export const useSetActiveNotes = () =>
    useActiveNoteStore((s) => s.setActiveNotes)

export const useDeleteByFolderId = () =>
    useActiveNoteStore((s) => s.deleteByFolderId)

export const useDeleteActiveNote = () =>
    useActiveNoteStore((s) => s.deleteActiveNote)

export const useAddActiveNote = () =>
    useActiveNoteStore((s) => s.addActiveNote)

export const useFindActiveStatus = () =>
    useActiveNoteStore((s) => s.findActiveStatus)

export const useChangeActiveNoteName = () =>
    useActiveNoteStore((s) => s.changeActiveNoteName)