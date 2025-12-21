// modal components
import DeleteModal from "./Modals/DelProjectModal/DelProjectModal";
import ConnectionToggleModal from "./Modals/ConnectionToggleModal/ConnectionToggleModal";

// store hooks for using
import { useShowDeleteModal } from "../stores/ModalRendererStore/ModelRendererStore";
import { useShowConnectionModal } from "../stores/ModalRendererStore/ModelRendererStore";

export default function ModalRenderer() {

    // hook init
    const showDeleteModal = useShowDeleteModal()    
    const showConnectionModal = useShowConnectionModal()

    return (
        <div className='modal-renderer'>
            {showDeleteModal && 
                <DeleteModal />             
            }
            {showConnectionModal &&
                <ConnectionToggleModal />
            }

        </div>
    )

}