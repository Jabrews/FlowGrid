import { create } from 'zustand';

type SideDropperStoreActions = {
    toggleSideOpen : (toggleValue: boolean) => void
    toggleCloseAllDropperTables: (toggleValue: boolean) => void
};

type SideDropperStore = {
    sideOpen : boolean
    closeAllDropperTables : boolean
    actions : SideDropperStoreActions
    
}



export const useSideDropperStore = create<SideDropperStore>((set) => ({
    sideOpen: false,
    closeAllDropperTables : false,
    actions : {
        toggleSideOpen: (toggleValue: boolean) => set(() => ({ sideOpen: toggleValue })),
        toggleCloseAllDropperTables: (toggleValue: boolean) => set(() => ({ closeAllDropperTables : toggleValue })),


        }

}));

export function useSideOpen() {
    return useSideDropperStore((s) => s.sideOpen)

}

export function useToggleSideOpen () {
    return useSideDropperStore((s) => s.actions.toggleSideOpen)
}
 

export function useCloseAllDropperTables () {
    return useSideDropperStore((s) => s.closeAllDropperTables)
}

export function useToggleCloseAllDropperTables () {
    return useSideDropperStore((s) => s.actions.toggleCloseAllDropperTables)
}