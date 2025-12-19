import {motion} from 'framer-motion'

// hooks
import { useToggleShowConnectionModal } from "../../stores/ModalRendererStore/ModelRendererStore"
import { useActiveConnectionItemI } from "../../stores/ConnectionModalStore/ConnectionModalStore"

export default function ConnectionToggleModal() {

    // hooks
    const toggleShowConnectionModal = useToggleShowConnectionModal()
    const activeConnectionItemI = useActiveConnectionItemI()



    return (
        <div className='center-modal'>
            <div className='connection-modal'>

                <h2 className='big-h2'> {
                    activeConnectionItemI.replace(/-.*/, "").replace(/^./, c => c.toUpperCase())
                } : </h2>




                <motion.button
                    className='exit-btn'
                    onClick={() => {toggleShowConnectionModal(false)}} 
                    whileHover={{
                        scale: 1.1,
                        transition: { duration: 1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    Close
                </motion.button>

            </div>
            <p> modal </p>
        </div>
    )


}