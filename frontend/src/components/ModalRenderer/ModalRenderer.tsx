// modal components
import DeleteModal from "./Modals/DelProjectModal/DelProjectModal";
import ConnectionToggleModal from "./Modals/ConnectionToggleModal/ConnectionToggleModal";
import TutorialModal from "./Modals/TutorialModal/TutorialModal";

// store hooks for using
import { useShowDeleteModal } from "../stores/ModalRendererStore/ModelRendererStore";
import { useShowConnectionModal } from "../stores/ModalRendererStore/ModelRendererStore";
import { useShowTutorialModal } from "../stores/ModalRendererStore/ModelRendererStore";

export default function ModalRenderer() {

    // hook init
    const showDeleteModal = useShowDeleteModal()    
    const showConnectionModal = useShowConnectionModal()
    const showTutorialModal = useShowTutorialModal()


    return (
        <div className='modal-renderer'>
            {showDeleteModal && 
                <DeleteModal />             
            }
            {showConnectionModal &&
                <ConnectionToggleModal />
            }
            {showTutorialModal &&
                <TutorialModal />     
            }

        </div>
    )

}