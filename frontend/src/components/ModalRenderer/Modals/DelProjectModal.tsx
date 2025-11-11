import { motion } from 'framer-motion'

// hooks
import { useToggleShowDeleteModal } from "../../stores/ModalRendererStore/ModelRendererStore"
import { useConfirmStore } from "../../stores/ConfirmStore/ConfirmStore"

export default function DelProjectModal () {

    const toggleShowDeleteModal = useToggleShowDeleteModal()
    const { confirm, cancel } = useConfirmStore()

    const handleToggleDeleteBtnConfirm = () => {
        confirm()
        toggleShowDeleteModal(false)
    }

    const handleCancelBtn = () => {
        cancel()
        toggleShowDeleteModal(false)
    }

    return (
        <div className='delete-modal'>
            <h1 className='big-h2'>This action cannot be undone. Continue?</h1>

            <div className='btn-container'>

                <motion.button
                    onClick={handleCancelBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                >
                    Cancel
                </motion.button>

                <motion.button
                    onClick={handleToggleDeleteBtnConfirm}
                    style={{ backgroundColor: "red", color: "white" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                >
                    Delete
                </motion.button>

            </div>
        </div>
    )
}
