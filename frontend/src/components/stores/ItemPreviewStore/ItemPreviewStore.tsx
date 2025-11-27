import {create} from 'zustand'
import type { Layout } from '../../Grid/util/types'

// NOTE, this is for the mobile item preview,

type ItemPreviewStore = {
    itemPreviewEventActice : boolean
    previewItemI : string
    previewItemType : string
    layout : Layout[]
    
    toggleItemPreviewEventActice : (toggleVal : boolean) => void
    setPreviewItemI : (newI : string) => void 
    setPreviewItemType : (newType : string) => void
    addPreviewItemToLayout : (itemPreviewLayout : Layout) => void
    deletePreviewItemFromLayout : (itemPreviewI : string) => void
    setLayout : (newLayout : Layout[]) => void;

}

export const useItemPreviewStore = create<ItemPreviewStore>((set) => ({

    itemPreviewEventActice : false,
    previewItemI : '',
    previewItemType : '',
    layout : [],
    toggleItemPreviewEventActice : (toggleVal : boolean) => set((s) => ({
        ...s,
        itemPreviewEventActice : toggleVal
    })),
    setPreviewItemI: (newI: string) => set((s) => ({
        ...s,
        previewItemI: newI 
    })),
    setPreviewItemType: (newType: string) => set((s) => ({
        ...s,
        previewItemType: newType 
    })),
    addPreviewItemToLayout : (itemPreviewLayout ) => set((s) => ({
        ...s,
        layout: [...s.layout, itemPreviewLayout]
    })),
    deletePreviewItemFromLayout : (itemPreviewI) => set((s) => ({
        ...s,
        layout : s.layout.filter((item) => item.i !== itemPreviewI)
    })),
    setLayout : (layout : Layout[]) => set((s) => ({
        ...s,
        layout : layout,

    }))



}))


export const useItemPreviewEventActive = () => 
    useItemPreviewStore((s) => s.itemPreviewEventActice)

export const useToggleItemPreviewEventActive = () => 
    useItemPreviewStore((s) => s.toggleItemPreviewEventActice)

export const usePreviewItemI = () =>
    useItemPreviewStore((s) => s.previewItemI)

export const useSetPreviewItemI = () =>
    useItemPreviewStore((s) => s.setPreviewItemI)

export const usePreviewItemType = () =>
    useItemPreviewStore((s) => s.previewItemType)

export const useSetPreviewItemType = () =>
    useItemPreviewStore((s) => s.setPreviewItemType)

export const useLayout = () =>
    useItemPreviewStore((s) => s.layout)

export const useAddPreviewItemToLayout = () =>
    useItemPreviewStore((s) => s.addPreviewItemToLayout)

export const useDeletePreviewItemFromLayout = () =>
    useItemPreviewStore((s) => s.deletePreviewItemFromLayout)

export const useSetLayout = () =>
    useItemPreviewStore((s) => s.setLayout)



