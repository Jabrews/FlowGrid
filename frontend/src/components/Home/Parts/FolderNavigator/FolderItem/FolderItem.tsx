import { useState, useEffect} from 'react'
import {motion} from 'framer-motion'

// hooks
import useMutateDeleteProjectFolder from "./hooks/useMutateDeleteProjectFolder"
import { useToggleShowDeleteModal} from '../../../../stores/ModalRendererStore/ModelRendererStore'
import { useConfirmDeleteProjectFolder} from '../../../../stores/DeleteProjectFolderStore/DeleteProjectFolderStore'
import { useSetDeleteProjectFolderId } from '../../../../stores/DeleteProjectFolderStore/DeleteProjectFolderStore'
import { useDeleteProjectFolderId } from '../../../../stores/DeleteProjectFolderStore/DeleteProjectFolderStore'


interface FolderItemProps {
    selected: string
    onSelect: (id: string) => void
    title : string
    id : string
}

export default function FolderItem({selected, onSelect, title, id} : FolderItemProps) {

    const [showBtns, toggleShowBtns] = useState(false)
    
    // hook init
    const deleteProjectFolder = useMutateDeleteProjectFolder()
    const toggleShowDeleteModal = useToggleShowDeleteModal()
    const confirmDeleteProjectFolder = useConfirmDeleteProjectFolder()
    const deleteProjectFolderId = useDeleteProjectFolderId()
    const setDeleteProjectFolderId = useSetDeleteProjectFolderId()



    const handleItemClick = (id: string) => {
        onSelect(id)
        setDeleteProjectFolderId(id)

    }

    const handleDeleteBtn = async () => {
        toggleShowDeleteModal(true)
    }

    useEffect(() => {
        if (confirmDeleteProjectFolder && deleteProjectFolderId == id) {
            deleteProjectFolder.mutate(id)
        }
    }, [confirmDeleteProjectFolder, deleteProjectFolderId])


    
    return (
        <div className='folder-body'>
            {/* after adding logic for selection of mapped array*/}
            <motion.div 
                className={`folder-item-container ${selected == id ? 'selected' : ''}`}
                onClick={() => handleItemClick(id)}
                onHoverStart={() => {toggleShowBtns(true)}}
                onHoverEnd={() => {toggleShowBtns(false)}}
            >
                <div className='folder-item-header'> 
                    <p 
                        className='delete-btn' 
                        style={{'display' : showBtns ? 'block' : 'none'}}
                        onClick={handleDeleteBtn}
                    >  X  </p>
                    <h2 className='item-label'>{title}</h2>
                </div>
            </motion.div>
        </div>

    )


}