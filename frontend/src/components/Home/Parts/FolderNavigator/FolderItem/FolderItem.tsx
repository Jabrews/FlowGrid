import { useState } from 'react'
import {motion} from 'framer-motion'

// hooks
import useMutateDeleteProjectFolder from "./hooks/useMutateDeleteProjectFolder"
import useMutatePatchProjectFolder from './hooks/useMutatePatchProjectFolder'
// delete modal
import { useToggleShowDeleteModal} from '../../../../stores/ModalRendererStore/ModelRendererStore'
import { useConfirmStore } from '../../../../stores/ConfirmStore/ConfirmStore'
// activeProjectStuff
import { useSetActiveFolderName } from '../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore'
import { useSetActiveFolderId } from '../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore'
import { useActiveFolderId } from '../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore'

type FolderItemProps = {
  folderId : string,
  folderName : string,
}

export default function FolderItem({folderId, folderName} : FolderItemProps) {

  const [, toggleShowBtns] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(folderName)

  // hook init
  const deleteProjectFolder = useMutateDeleteProjectFolder()
  const patchProjectFolder = useMutatePatchProjectFolder()
  const toggleShowDeleteModal = useToggleShowDeleteModal()
  const { ask } = useConfirmStore()
  const setActiveFolderName = useSetActiveFolderName()
  const setActiveFolderId = useSetActiveFolderId()
  const activeFolderId = useActiveFolderId()



  const handleItemClick = () => {
    setActiveFolderName(folderName)
    setActiveFolderId(folderId)
    setIsEditing(true)
  }

  const handleDeleteBtn = async () => {
    const waitForConfirm = ask()  
    toggleShowDeleteModal(true)
    const confirmed = await waitForConfirm
    if (confirmed) deleteProjectFolder.mutate({
      id : folderName
    })
    toggleShowDeleteModal(false)
  }

  const handleSubmit = () => {
    setIsEditing(false)

    if (!value.trim() || value.trim() === folderName) return

    patchProjectFolder.mutate(
      {
        folderId,
        newText: value.trim(),
      },
      {
        onSuccess: () => {
          setActiveFolderName(value.trim())
        },
      }
    )
    
  }


  return (
    <div className="folder-body">
      <motion.div
        data-testid='folder-item-container'
        className={`folder-item-container ${activeFolderId == folderId ? 'selected' : ''}`}
        onClick={() => handleItemClick()}
        onHoverStart={() => toggleShowBtns(true)}
        onHoverEnd={() => toggleShowBtns(false)}
      >
        <div className="folder-item-header">

          <p
            className="delete-btn"
            style={{ display: activeFolderId == folderId ? 'block' : 'none' }}
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteBtn()
            }}
          >
            X
          </p>

          <input
            data-testid='folder-item-input'
            id={folderId}
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
