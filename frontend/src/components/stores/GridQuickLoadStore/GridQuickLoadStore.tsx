import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type GridQuickLoadStore = {
  lastActiveFolderItemId: string
  setLastActiveFolderItemId: (newId: string) => void
}

export const useGridQuickLoadStore = create<GridQuickLoadStore>()(
  persist(
    (set) => ({
      lastActiveFolderItemId: '',
      setLastActiveFolderItemId: (newId: string) => {
        set({ lastActiveFolderItemId: newId }) 
      }
    }),
    {
      name: 'grid-quick-load-store',
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        lastActiveFolderItemId: state.lastActiveFolderItemId
      })
    }
  )
)

// State selector
export const useLastActiveFolderItemId = () =>
  useGridQuickLoadStore((s) => s.lastActiveFolderItemId)

// Action selector - using shallow equality for function reference
export const useSetLastActiveFolderItemId = () =>
  useGridQuickLoadStore((s) => s.setLastActiveFolderItemId)
