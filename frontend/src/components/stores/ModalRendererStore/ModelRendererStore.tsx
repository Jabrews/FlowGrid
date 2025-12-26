import { create } from "zustand";


type ModalRendererStoreActions = {
    toggleShowDeleteModal : (bool : boolean) => void
    toggleShowConnectionModal : (bool : boolean) => void

}


type ModalRendererStore = {
    showDeleteModal : boolean
    showConnectionModal : boolean
    actions : ModalRendererStoreActions
}


export const useModelRendererStore = create<ModalRendererStore>((set) => ({
    showDeleteModal: false,
    showConnectionModal : false,
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
       },
}));

// hooks
export const useShowDeleteModal = () => 
    useModelRendererStore((s) => s.showDeleteModal)

export const useShowConnectionModal = ( ) =>
    useModelRendererStore((s) => s.showConnectionModal)


// hook actions
export const useToggleShowDeleteModal = () =>
    useModelRendererStore((s) => s.actions.toggleShowDeleteModal)

export const useToggleShowConnectionModal = () =>
    useModelRendererStore((s) => s.actions.toggleShowConnectionModal)



