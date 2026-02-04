// hooks
import { useToggleShowViewTutorialModal } from "../../../stores/ModalRendererStore/ModelRendererStore"

export default function ViewTutorialModal() {
    
    const toggleShowViewTutorialModal = useToggleShowViewTutorialModal()

    const handleExitBtn = () => {
        toggleShowViewTutorialModal(false)
    }


    return (
        <div className='center-modal'>
            <div className='view-tutorial-modal'>
                <div className='text'>
                    <p> Click lightbulb icon (navbar) to view tutorial</p>
                    <p className='note'> note : this can be accessed anytime</p>
                </div>
                <button onClick={handleExitBtn}> close </button>
            </div>
        </div>

    )



}