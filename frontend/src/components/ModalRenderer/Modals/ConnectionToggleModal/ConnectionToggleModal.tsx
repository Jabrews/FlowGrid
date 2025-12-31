import {motion} from 'framer-motion'

// hooks
import { useToggleShowConnectionModal } from "../../../stores/ModalRendererStore/ModelRendererStore"
import { useActiveConnectionItemI } from "../../../stores/ConnectionModalStore/ConnectionModalStore"
import useQueryTrackObjByItemI from './hooks/useQueryTrackObjByItemI'

// util
import type { TrackObj } from '../../../Grid/GridItemHeader/util/track_obj_type'

// components
import ConnectionLi from './ConnectionLi/ConnectionLi'

export default function ConnectionToggleModal() {

    // hooks
    const toggleShowConnectionModal = useToggleShowConnectionModal()
    const activeConnectionItemI = useActiveConnectionItemI()
    const queryTrackObjsByItemI = useQueryTrackObjByItemI

    if (!activeConnectionItemI) return
    const activeConnectionItemType = activeConnectionItemI.replace(/-.*/, "")

    const {data} = queryTrackObjsByItemI({activeConnectionItemI})



    return (
        <div className='center-modal'>
            <div className='connection-modal'>

                <h2 className='big-h2'> {
                    activeConnectionItemI.replace(/-.*/, "").replace(/^./, c => c.toUpperCase())
                } : </h2>

                {/* LIST OBJECTS*/}
                {/*
                    LOGIC HERE
                */}

                <ul>
                {data?.map((trackObj: TrackObj) => (
                    <ConnectionLi 
                        trackObj={trackObj} 
                        activeConnectionItemType={activeConnectionItemType}  
                        key={`connection-li-${trackObj.id}`} />
                    ))}
                </ul>

                {data && data.length == 0 ? (
                    <p> No Items Connected, <br/> Drag over connection circle <br/>on valid grid items to connect</p>
                ) : (
                    <p className='note'> 
                        NOTE : after disconnecting an item, <br/>all data in the tracker will be deleted.
                    </p>
                )
                
                }



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
        </div>
    )


}