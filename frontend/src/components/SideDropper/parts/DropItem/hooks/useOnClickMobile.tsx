import {nanoid} from 'nanoid'

// utlill
import getCenterPos from '../util/getCenterPos.ts'

// side open store hooks
import { useToggleSideOpen } from '../../../../stores/SideDropperStore/SideDropperStore.tsx'

// item preview store
// import {useToggleItemPreviewActive} from '../../../../../stores/ItemPreviewStore/ItemPreviewStore'
// import {useSetActiveItemPreviewId, useSetActiveItemPreviewType} from '../../../../../stores/ItemPreviewStore/ItemPreviewStore'

// item creation hooks
// import {useAddMetaElement} from '../../../../../../cross-platform/stores/MetaFactory/MetaFactory'
// import {useAddElement} from '../../../../../../cross-platform/stores/ElementFactory/ElementFactory'


export default function useOnClickMobile(type: string) {

    const id = `${type}-${nanoid()}`

    // init  hooks
    const toggleSideOpen = useToggleSideOpen()
    // const toggleItemPreviewActive = useToggleItemPreviewActive()
    // const setActiveItemPreviewId = useSetActiveItemPreviewId()
    // const setActiveItemPreviewType = useSetActiveItemPreviewType()
    const centerPos = getCenterPos(id)
    // const addMetaElement = useAddMetaElement()

    return () => {
        if (!type) return;
        // toggleSideOpen(false)
        // toggleItemPreviewActive(true)
        // setActiveItemPreviewId(id)
        // setActiveItemPreviewType(type)
        // addMetaElement({
        //     id : id,
        //     type : type,
        //     pos : centerPos,
        //     isItemPreview : true
        // })
    };
}
