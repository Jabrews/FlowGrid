// modal components
import DeleteModal from "./Modals/DelProjectModal";

// store hooks for using
import { useShowDeleteModal } from "../stores/ModalRendererStore/ModelRendererStore";

export default function ModolRenderer() {

    // hook init
    const showDeleteModal = useShowDeleteModal()    

    return (
        <div className='modal-renderer'>
            {showDeleteModal && 
                <DeleteModal />             
            }

        </div>
    )

}