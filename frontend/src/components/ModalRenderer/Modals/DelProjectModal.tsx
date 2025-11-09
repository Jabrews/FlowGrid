// hooks
import { useToggleShowDeleteModal } from "../../stores/ModalRendererStore/ModelRendererStore"
import { useToggleConfirmDeleteProjectFolder } from "../../stores/DeleteProjectFolderStore/DeleteProjectFolderStore"
import { useSetDeleteProjectFolderId } from "../../stores/DeleteProjectFolderStore/DeleteProjectFolderStore"

export default function DelProjectModal () {

    // hook init
    const toggleDeleteProjectFolder = useToggleConfirmDeleteProjectFolder()
    const toggleShowDeleteModal = useToggleShowDeleteModal()
    const setDeleteProjectFolderId = useSetDeleteProjectFolderId()

    const handleToggleDeleteBtnConfirm = () => {
        toggleDeleteProjectFolder(true)
        setDeleteProjectFolderId('')
        toggleShowDeleteModal(false)
    }

    return (
        <div className='delete-modal'>
            <h1> Are you sure you want to delete this</h1>
            <h1> All projects inside this folder will also be deleted</h1>
            <div className='btn-container'>
                {/* closes modal*/}
                <button onClick={() => {toggleShowDeleteModal(false)}}> Cancel</button>
                <button onClick={handleToggleDeleteBtnConfirm}> Delete </button>
            </div>
        </div>
    )

}