import { create } from 'zustand'

type DeleteProjectFolderStore = {
  confirmDeleteProjectFolder: boolean
  deleteProjectFolderId: string | null
  toggleConfirmDeleteProjectFolder: (bool: boolean) => void
  setDeleteProjectFolderId: (newId: string | null) => void
}

export const useDeleteProjectFolderStore = create<DeleteProjectFolderStore>((set) => ({
  confirmDeleteProjectFolder: false,
  deleteProjectFolderId: null,
  toggleConfirmDeleteProjectFolder: (bool) =>
    set(() => ({
      confirmDeleteProjectFolder: bool
    })),
  setDeleteProjectFolderId: (newId) =>
    set(() => ({
      deleteProjectFolderId: newId
    }))
}))

// hooks
export const useConfirmDeleteProjectFolder = () =>
    useDeleteProjectFolderStore((s) => s.confirmDeleteProjectFolder)

export const useDeleteProjectFolderId = () =>
    useDeleteProjectFolderStore((s) => s.deleteProjectFolderId)


// actions
export const useToggleConfirmDeleteProjectFolder = () =>
    useDeleteProjectFolderStore((s) => s.toggleConfirmDeleteProjectFolder)

export const useSetDeleteProjectFolderId = () =>
    useDeleteProjectFolderStore((s) => s.setDeleteProjectFolderId)


