import { create } from "zustand";


type ModalRendererStoreActions = {
    toggleShowDeleteModal : (bool : boolean) => void
    toggleShowConnectionModal : (bool : boolean) => void
    toggleShowTutorialModal : (bool : boolean) => void
}


type ModalRendererStore = {
    showDeleteModal : boolean
    showConnectionModal : boolean
    showTutorialModal : boolean
    actions : ModalRendererStoreActions
}


export const useModelRendererStore = create<ModalRendererStore>((set) => ({
    showDeleteModal: false,
    showConnectionModal : false,
    showTutorialModal : false,
    actions: {
        toggleShowDeleteModal: (bool: boolean) =>
            set((s) => ({
                ...s,
                showDeleteModal: bool
        })),
        toggleShowConnectionModal : (bool : boolean) => 
            set((s) => ({
                ...s,
                showConnectionModal : bool
        })),
        toggleShowTutorialModal : (bool : boolean) =>
            set((s) => ({
                ...s,
                showTutorialModal : bool
        })),
       },
}));

// hooks
export const useShowDeleteModal = () => 
    useModelRendererStore((s) => s.showDeleteModal)

export const useShowConnectionModal = ( ) =>
    useModelRendererStore((s) => s.showConnectionModal)

export const useShowTutorialModal = () => 
    useModelRendererStore((s) => s.showTutorialModal)

// hook actions
export const useToggleShowDeleteModal = () =>
    useModelRendererStore((s) => s.actions.toggleShowDeleteModal)

export const useToggleShowConnectionModal = () =>
    useModelRendererStore((s) => s.actions.toggleShowConnectionModal)

export const useToggleShowTutorialModal = () =>
    useModelRendererStore((s) => s.actions.toggleShowTutorialModal)


