import { create } from "zustand";


type ModalRendererStoreActions = {
    toggleShowDeleteModal : (bool : boolean) => void
    toggleShowConnectionModal : (bool : boolean) => void
    toggleShowTutorialModal : (bool : boolean) => void
    toggleShowViewTutorialModal : (bool : boolean) => void
}


type ModalRendererStore = {
    showDeleteModal : boolean
    showConnectionModal : boolean
    showTutorialModal : boolean
    showViewTutorialModal : boolean
    actions : ModalRendererStoreActions
}


export const useModelRendererStore = create<ModalRendererStore>((set) => ({
    showDeleteModal: false,
    showConnectionModal : false,
    showTutorialModal : false,
    showViewTutorialModal : false,
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
        toggleShowViewTutorialModal: (bool : boolean) =>
            set((s) => ({
                ...s,
                showViewTutorialModal: bool
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

export const useShowViewTutorialModal = () =>
    useModelRendererStore((s) => s.showViewTutorialModal)

// hook actions
export const useToggleShowDeleteModal = () =>
    useModelRendererStore((s) => s.actions.toggleShowDeleteModal)

export const useToggleShowConnectionModal = () =>
    useModelRendererStore((s) => s.actions.toggleShowConnectionModal)

export const useToggleShowTutorialModal = () =>
    useModelRendererStore((s) => s.actions.toggleShowTutorialModal)

export const useToggleShowViewTutorialModal = () =>
    useModelRendererStore((s) => s.actions.toggleShowViewTutorialModal)


