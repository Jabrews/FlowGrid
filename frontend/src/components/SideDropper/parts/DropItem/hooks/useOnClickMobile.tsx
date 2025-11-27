import {nanoid} from 'nanoid'

// utlil
import getCenterPos from '../util/getCenterPos.ts'

// hooks
import { useToggleSideOpen } from '../../../../stores/SideDropperStore/SideDropperStore.tsx';
import { useToggleItemPreviewEventActive } from '../../../../stores/ItemPreviewStore/ItemPreviewStore.tsx';
import { useSetPreviewItemI } from '../../../../stores/ItemPreviewStore/ItemPreviewStore.tsx'; 
import { useSetPreviewItemType } from '../../../../stores/ItemPreviewStore/ItemPreviewStore.tsx';
import { useAddPreviewItemToLayout } from '../../../../stores/ItemPreviewStore/ItemPreviewStore.tsx';


export default function useOnClickMobile(type: string) {

    const i = `${type}-${nanoid()}`

    // init  hooks
    const toggleSideOpen = useToggleSideOpen()
    const toggleItemPreviewEventActive = useToggleItemPreviewEventActive()
    const setPreviewItemI = useSetPreviewItemI()
    const setPreviewItemType = useSetPreviewItemType()
    const addPreviewItemToLayout = useAddPreviewItemToLayout()
    const centerPos = getCenterPos() // gets x y h w

    return () => {
        if (!type) return;
        toggleSideOpen(false)
        toggleItemPreviewEventActive(true)
        setPreviewItemI(i)
        setPreviewItemType(type)

        setTimeout(() => {
            addPreviewItemToLayout({
                i: i,
                type : type,
                x : centerPos.x,
                y : centerPos.y,
                h : centerPos.h,
                w : centerPos.w,
                isMobileItemPreview: true,
                static : false,
                isResizeable : false,
            })
        }, 600);
        // then scroll to center
    
    };
}
