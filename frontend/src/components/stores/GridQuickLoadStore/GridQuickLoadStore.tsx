import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type GridQuickLoadStore = {
  lastActiveFolderItemId: string
  lastActiveProjectId : string
  setLastActiveFolderItemId: (newId: string) => void
  setLastActiveProjectId : (newId : string) => void
}

export const useGridQuickLoadStore = create<GridQuickLoadStore>()(
  persist(
    (set) => ({
      lastActiveFolderItemId: '',
      lastActiveProjectId : '',
      setLastActiveFolderItemId: (newId: string) => {
        set({ lastActiveFolderItemId: newId }) 
      },
      setLastActiveProjectId: (newId : string) => {
        set({lastActiveProjectId : newId })
      }
    }),
    {
      name: 'grid-quick-load-store',
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        lastActiveFolderItemId: state.lastActiveFolderItemId,
        lastActiveProjectId : state.lastActiveProjectId,
      })
    }
  )
)

// state
export const useLastActiveFolderItemId = () =>
  useGridQuickLoadStore((s) => s.lastActiveFolderItemId)
export const useLastActiveProjectId = () =>
  useGridQuickLoadStore((s) => s.lastActiveProjectId)


// actions
export const useSetLastActiveFolderItemId = () =>
  useGridQuickLoadStore((s) => s.setLastActiveFolderItemId)
export const useSetLastActiveProjectId = () =>
  useGridQuickLoadStore((s) => s.setLastActiveProjectId)
