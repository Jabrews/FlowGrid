// hooks
import { useToggleItemPreviewEventActive } from "../../stores/ItemPreviewStore/ItemPreviewStore"
import { useDeletePreviewItemFromLayout } from "../../stores/ItemPreviewStore/ItemPreviewStore"
import { usePreviewItemI } from "../../stores/ItemPreviewStore/ItemPreviewStore"



export default function useResetMobileWorkSpace() {

    // hook init    
    const toggleItemPreviewEventActive = useToggleItemPreviewEventActive()
    const deletePreviewItemFromLayout = useDeletePreviewItemFromLayout()
    const previewItemI = usePreviewItemI()

    return () => {
        toggleItemPreviewEventActive(false)
        deletePreviewItemFromLayout(previewItemI)
    }


}
