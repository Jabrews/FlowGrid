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
        deleteTrackObjectMutation.mutate(
            trackObj
        )
        toggleShowConnectionModal(false)

    }


    return (
        <li
            className="connection-li"
            >
                {trackerEvent ? (
                    <div className='connection-li-container'>
                        {/* ONLY DIFFRENCE BEWTEEN THEM*/}
                        <p> {trackObj.customName} </p>
                        <button 
                            onClick={handleDisconnectBtn}
                        > 
                            Disconnect 
                        </button>
                    </div>      
                )
                : (
                    <div className='connection-li-container'>
                        <p> {trackObj.customName}</p>
                        <button 
                            onClick={handleDisconnectBtn}

                        > 
                            Disconnect 
                        </button>
                    </div>
                )

            }

                {/* <p> {trackObj.} </p> */}
        </li>

    )


}