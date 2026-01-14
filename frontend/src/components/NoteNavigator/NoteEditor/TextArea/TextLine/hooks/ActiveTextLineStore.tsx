import { create } from "zustand";

type ActiveTextLineStore = {
    activeTextLineNum : number
    setActiveTextLineNum : (newLineNum : number) => void
}

const useActiveTextLineStore = create<ActiveTextLineStore>((set) => ({
    activeTextLineNum : 0,
    setActiveTextLineNum : (newLineNum : number) => set((s) => ({
        ...s,
        activeTextLineNum : newLineNum
    }))

}))

export const useActiveTextLineNum = () =>
    useActiveTextLineStore((s) => s.activeTextLineNum) 

export const useSetActiveTextLineNum = () =>
    useActiveTextLineStore((s) => s.setActiveTextLineNum) 