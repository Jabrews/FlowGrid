import { useState, useEffect} from "react"

// hooks
import useDeleteTrackObjectMutation from "../hooks/useDeleteTrackObjectMutation"
import { useToggleShowConnectionModal } from "../../../../stores/ModalRendererStore/ModelRendererStore"

// util
import type { TrackObj } from "../../../../Grid/GridItemHeader/util/track_obj_type"

type ConnectionLiProps = {
    trackObj : TrackObj
    activeConnectionItemType : string
}


export default function ConnectionLi({trackObj, activeConnectionItemType} : ConnectionLiProps) {

    // hook init    
    const deleteTrackObjectMutation = useDeleteTrackObjectMutation()
    const toggleShowConnectionModal = useToggleShowConnectionModal()

    const [trackerEvent, toggleTrackerEvent] = useState(false)

    useEffect(() => {
       if (activeConnectionItemType == 'tracker')  {
        toggleTrackerEvent(true)
    }


    }, [activeConnectionItemType])

    const handleDisconnectBtn = () => {
        if (!trackObj.id) return
        deleteTrackObjectMutation.mutate({
            gridItemI : trackObj.gridItemI,
            trackObjId : trackObj.id.toString()
        })
        toggleShowConnectionModal(false)

    }


    return (
        <li
            className="connection-li"
            >
                {trackerEvent ? (
                    <div className='connection-li-container'>
                        {/* ONLY DIFFRENCE BEWTEEN THEM*/}
                        <p> {trackObj.gridItemI} </p>
                        <button 
                            onClick={handleDisconnectBtn}
                        > 
                            Disconnect 
                        </button>
                    </div>      
                )
                : (
                    <div className='connection-li-container'>
                        <p> {trackObj.trackerI} </p>
                        <button 
                            onClick={handleDisconnectBtn}

                        > 
                            Disconnect 
                        </button>
                    </div>
                )

            }
            <p className='note'> 
                NOTE : after disconnecting an item, all data in the tracker will be deleted.
            </p>

                {/* <p> {trackObj.} </p> */}
        </li>

    )


}