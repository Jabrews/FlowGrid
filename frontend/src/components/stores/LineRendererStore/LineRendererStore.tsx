import { create } from "zustand";

type LineRendererStore = {
    pauseRender : boolean,
    togglePauseRender : (newBool : boolean) => void


}

export const useLineRendererStore = create<LineRendererStore>((set) => ({
    pauseRender : false,
    togglePauseRender: (bool: boolean) => set(
        (s) => ({
            ...s,
            pauseRender: bool
        })
    ),
}))

export const usePauseRender= () => 
    useLineRendererStore((s) => s.pauseRender)

export const  useTogglePauseRender= () =>
    useLineRendererStore((s) => s.togglePauseRender)
