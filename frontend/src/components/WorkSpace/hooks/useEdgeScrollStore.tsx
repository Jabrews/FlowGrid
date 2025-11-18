import { create } from 'zustand';

type EdgeScrollStoreActions  = {
    toggleScrollEventActive: (toggleValue: boolean) => void
};

type EdgeScrollStore = {
    scrollEventActive : boolean   
    actions : EdgeScrollStoreActions 
}



export const useEdgeScrollStore = create<EdgeScrollStore>((set, get) => ({
    scrollEventActive : false,
    actions : {
        toggleScrollEventActive: (toggleValue: boolean) => set(() => ({ scrollEventActive : toggleValue })),
    }

}));


export function useEditorScrollEventActive() {
    return useEdgeScrollStore((s) => s.scrollEventActive)
}

export function useToggleEditorScrollEventActive() {
    return useEdgeScrollStore((s) => s.actions.toggleScrollEventActive)
}