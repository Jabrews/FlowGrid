import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ProjectFolderStore = {
  ActiveProjectId: string
  ActiveProjectName: string
  ActiveFolderId: string
  ActiveFolderName: string
  GridUrl: string

  setActiveProjectId: (id: string) => void
  setActiveProjectName: (name: string) => void
  setActiveFolderId: (id: string) => void
  setActiveFolderName: (name: string) => void

  setGridUrl: () => void
}

export const useProjectAndFolderStore = create<ProjectFolderStore>()(
  persist(
    (set, get) => ({
      ActiveProjectId: '',
      ActiveProjectName: '',
      ActiveFolderId: '',
      ActiveFolderName: '',
      GridUrl: '',

      setActiveProjectId: (id: string) => set({ ActiveProjectId: id }),
      setActiveProjectName: (name: string) => set({ ActiveProjectName: name }),
      setActiveFolderId: (id: string) => set({ ActiveFolderId: id }),
      setActiveFolderName: (name: string) => set({ ActiveFolderName: name }),

      setGridUrl: () => {
        const { ActiveFolderId, ActiveProjectId } = get()

        if (!ActiveFolderId || !ActiveProjectId) {
          set({
            GridUrl: '',
            ActiveFolderId: '',
            ActiveProjectId: '',
          })
          throw new Error("Missing ActiveFolderId or ActiveProjectId")
        }

        const url = `project_folders/${ActiveFolderId}/projects/${ActiveProjectId}`
        set({ GridUrl: url })
      }
    }),

    {
      name: 'project-folder-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        ActiveProjectId: state.ActiveProjectId,
        ActiveProjectName: state.ActiveProjectName,
        ActiveFolderId: state.ActiveFolderId,
        ActiveFolderName: state.ActiveFolderName,
        GridUrl: state.GridUrl,
      }),
    }
  )
)

// hooks
export const useActiveProjectId = () =>
  useProjectAndFolderStore((s) => s.ActiveProjectId)

export const useActiveProjectName = () =>
  useProjectAndFolderStore((s) => s.ActiveProjectName)

export const useActiveFolderId = () =>
  useProjectAndFolderStore((s) => s.ActiveFolderId)

export const useActiveFolderName = () =>
  useProjectAndFolderStore((s) => s.ActiveFolderName)

export const useGridUrl = () =>
  useProjectAndFolderStore((s) => s.GridUrl)


// actions
export const useSetActiveProjectId = () =>
  useProjectAndFolderStore((s) => s.setActiveProjectId)

export const useSetActiveProjectName = () =>
  useProjectAndFolderStore((s) => s.setActiveProjectName)

export const useSetActiveFolderId = () =>
  useProjectAndFolderStore((s) => s.setActiveFolderId)

export const useSetActiveFolderName = () =>
  useProjectAndFolderStore((s) => s.setActiveFolderName)

export const useSetGridUrl = () =>
  useProjectAndFolderStore((s) => s.setGridUrl)
