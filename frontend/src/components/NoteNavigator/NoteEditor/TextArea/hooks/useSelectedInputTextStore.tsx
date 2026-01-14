
import { create } from "zustand"


type SelectedInputTextStore = {
    startIndex : null | number
    endIndex : null | number
    setStartIndex : (newStartIndex : null | number) => void
    setEndIndex : (newEndIndex : null | number) => void
}

// this is for allowing text area btns 
// to acess the active input selection ref indexes
const useSelectedInputTextStore = create<SelectedInputTextStore>((set) => ({
    startIndex : null,
    endIndex : null,
    setStartIndex : (newStartIndex : number | null) => set((s) => ({
        ...s,
        startIndex : newStartIndex
    })),
    setEndIndex : (newEndIndex : number | null) => set((s) => ({
        ...s,
        endIndex : newEndIndex,
    }))
}))

// actions
export const useSetStartIndex = () =>
  useSelectedInputTextStore((s) => s.setStartIndex)

export const useSetEndIndex = () =>
  useSelectedInputTextStore((s) => s.setEndIndex)



export const useSelectionEnd = () =>
  useSelectedInputTextStore((s) => s.endIndex)


export const useSelectionStart= () =>
  useSelectedInputTextStore((s) => s.startIndex)