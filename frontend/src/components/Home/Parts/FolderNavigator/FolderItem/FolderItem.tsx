import { useState } from 'react'
import {motion} from 'framer-motion'

// hooks
import useMutateDeleteProjectFolder from "./hooks/useMutateDeleteProjectFolder"
import useMutatePatchProjectFolder from './hooks/useMutatePatchProjectFolder'
import { useToggleShowDeleteModal} from '../../../../stores/ModalRendererStore/ModelRendererStore'
import { useConfirmStore } from '../../../../stores/ConfirmStore/ConfirmStore'
import { useSetActiveFolder } from '../../../../stores/NavbarStore/NavbarStore'
import { useSetFolderId } from '../../../../stores/ProjectStore/ProjectStore'

interface FolderItemProps {
    selectedFolderId: string
    onSelectedFolderId: (id: string) => void
    title : string
    id : string
}

export default function FolderItem({selectedFolderId, onSelectedFolderId, title, id} : FolderItemProps) {

  const [, toggleShowBtns] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(title)

  // hook init
  const deleteProjectFolder = useMutateDeleteProjectFolder()
  const patchProjectFolder = useMutatePatchProjectFolder()
  const toggleShowDeleteModal = useToggleShowDeleteModal()
  const { ask } = useConfirmStore()
  const setActiveFolder = useSetActiveFolder()
  const setFolderId = useSetFolderId()




  const handleItemClick = (id: string) => {
    onSelectedFolderId(id)
    setActiveFolder(title)
    setFolderId(selectedFolderId)

    setIsEditing(true)
  }

  const handleDeleteBtn = async () => {
    const waitForConfirm = ask()  
    toggleShowDeleteModal(true)
    const confirmed = await waitForConfirm
    if (confirmed) deleteProjectFolder.mutate(id)
    toggleShowDeleteModal(false)
  }

  const handleSubmit = () => {
    setIsEditing(false)

    if (!value.trim() || value.trim() === title) return

    patchProjectFolder.mutate({
      folderId: id,
      newText: value.trim(),
    })
  }


  return (
    <div className="folder-body">
      <motion.div
        className={`folder-item-container ${selectedFolderId == id ? 'selected' : ''}`}
        onClick={() => handleItemClick(id)}
        onHoverStart={() => toggleShowBtns(true)}
        onHoverEnd={() => toggleShowBtns(false)}
      >
        <div className="folder-item-header">

          <p
            className="delete-btn"
            style={{ display: selectedFolderId == id ? 'block' : 'none' }}
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteBtn()
            }}
          >
            X
          </p>

          <input
            id={id}
            className="item-label"
            value={value}
            disabled={!isEditing}
            onChange={(e) => setValue(e.currentTarget.value)}
            onBlur={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur()
            }}
          />

        </div>
      </motion.div>
    </div>
  )
}
