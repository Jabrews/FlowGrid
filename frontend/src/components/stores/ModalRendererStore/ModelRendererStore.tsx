import { create } from "zustand";


type ModalRendererStoreActions = {
    toggleShowDeleteModal : (bool : boolean) => void
}


type ModalRendererStore = {
    showDeleteModal : boolean
    actions : ModalRendererStoreActions
}


export const useModelRendererStore = create<ModalRendererStore>((set) => ({
    showDeleteModal: false,
    actions: {
        toggleShowDeleteModal: (bool: boolean) =>
            set((s) => ({
                ...s,
                showDeleteModal: bool
            })),
       },
}));

// hooks
export const useShowDeleteModal = () => 
    useModelRendererStore((s) => s.showDeleteModal)

// hook actions
export const useToggleShowDeleteModal = () =>
    useModelRendererStore((s) => s.actions.toggleShowDeleteModal)

