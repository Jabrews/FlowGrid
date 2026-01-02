import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ProjectFolderStore = {
  ActiveProjectId: string
  ActiveProjectName: string
  ActiveFolderId: string | null
  ActiveFolderName: string
  gridId : string,
  GridUrl: string

  setActiveProjectId: (id: string) => void
  setActiveProjectName: (name: string) => void
  setActiveFolderId: (id: string) => void
  setActiveFolderName: (name: string) => void
  setGridId : (id : string) => void
  resetFolderId : () => void,

  setGridUrl: () => void
}

export const useProjectAndFolderStore = create<ProjectFolderStore>()(
  persist(
    (set, get) => ({
      ActiveProjectId: '',
      ActiveProjectName: '',
      ActiveFolderId: '',
      ActiveFolderName: '',
      gridId : '',
      GridUrl: '',

      setActiveProjectId: (id: string) => set({ ActiveProjectId: id }),
      setActiveProjectName: (name: string) => set({ ActiveProjectName: name }),
      setActiveFolderId: (id: string) => set({ ActiveFolderId: id }),
      setActiveFolderName: (name: string) => set({ ActiveFolderName: name }),
      setGridId : (id : string) => set({gridId : id}),
      resetFolderId : () => set((s) => (
        {...s,
          ActiveFolderId : null
        }
      )),

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

export const useGridId = () =>
  useProjectAndFolderStore((s) => s.gridId)

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

export const useSetGridId = () =>
  useProjectAndFolderStore((s) => s.setGridId)

export const useSetGridUrl = () =>
  useProjectAndFolderStore((s) => s.setGridUrl)

export const useResetFolderId = () =>
  useProjectAndFolderStore((s) => s.resetFolderId)