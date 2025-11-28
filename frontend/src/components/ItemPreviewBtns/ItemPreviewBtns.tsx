import {motion} from 'framer-motion'

// hooks
import type { Layout } from '../Grid/util/types'
import { useItemPreviewEventActive } from "../stores/ItemPreviewStore/ItemPreviewStore"
import { useToggleItemPreviewEventActive } from '../stores/ItemPreviewStore/ItemPreviewStore'
import { usePreviewItemI } from '../stores/ItemPreviewStore/ItemPreviewStore'
import { useDeletePreviewItemFromLayout } from '../stores/ItemPreviewStore/ItemPreviewStore'
import { useLayout } from '../stores/ItemPreviewStore/ItemPreviewStore'
import useMutateCreateLayout from '../Grid/hooks/useMutateCreateLayout'


export default function ItemPreviewBtns () {

    // hook init
    const itemPreviewEventActive = useItemPreviewEventActive()
    const toggleItemPreviewEventActive = useToggleItemPreviewEventActive()
    const previewItemI = usePreviewItemI()
    const deletePreviewItemI = useDeletePreviewItemFromLayout()
    const layout = useLayout()
    const mutateCreateLayout = useMutateCreateLayout()

    // handlers
    const handleAddBtnClicked = () => {
        console.log('add btns')
        const previewItem = layout.find((item : Layout) => item.i == previewItemI)
        if (!previewItem) {
            throw new Error('Could not locate preview item for adding')
        }

        const newLayout : Layout = {
            i : previewItem.i,
            h : previewItem.h,
            w : previewItem.w,
            x : previewItem.x,
            y : previewItem.y,
            static : false,
            isResizeable : false,
            type : previewItem.type
        }

        mutateCreateLayout.mutate(newLayout)

        toggleItemPreviewEventActive(false)
    }

    const handleCancelBtnClicked = () => {
        deletePreviewItemI(previewItemI)
        toggleItemPreviewEventActive(false)
    }




    return (
        <>
        {itemPreviewEventActive && 
            <motion.div
            className='add-element-buttons-container'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            >
            <motion.button
                className='add-btn'
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                onClick={handleAddBtnClicked}
            >
                Add
            </motion.button>

            <motion.button
                className='cancel-btn'
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                onClick={handleCancelBtnClicked}
            >
                Cancel
            </motion.button>
            </motion.div>
        }

        </>
       
    )



}