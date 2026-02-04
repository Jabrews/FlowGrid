// modal components
import DeleteModal from "./Modals/DelProjectModal/DelProjectModal";
import ConnectionToggleModal from "./Modals/ConnectionToggleModal/ConnectionToggleModal";
import TutorialModal from "./Modals/TutorialModal/TutorialModal";
import ViewTutorialModal from "./Modals/ViewTutorialModal/ViewTutorialModal";

// store hooks for using
import { useShowDeleteModal } from "../stores/ModalRendererStore/ModelRendererStore";
import { useShowConnectionModal } from "../stores/ModalRendererStore/ModelRendererStore";
import { useShowTutorialModal } from "../stores/ModalRendererStore/ModelRendererStore";
import { useShowViewTutorialModal } from "../stores/ModalRendererStore/ModelRendererStore";

export default function ModalRenderer() {

    // hook init
    const showDeleteModal = useShowDeleteModal()    
    const showConnectionModal = useShowConnectionModal()
    const showTutorialModal = useShowTutorialModal()
    const showViewTutorialModal = useShowViewTutorialModal()


    return (
        <div className='modal-renderer'>
            {showDeleteModal && 
                <DeleteModal />             
            }
            {showConnectionModal &&
                <ConnectionToggleModal />
            }
            {showViewTutorialModal &&
                <ViewTutorialModal /> 
            }
            {showTutorialModal &&
                <TutorialModal />     
            }

        </div>
    )

}