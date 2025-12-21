import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useGridId } from "../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";
import { useAddTrackObj} from "../../../stores/TrackObjectsStore/TrackObjectsStore";


// util
import type { TrackObj } from "../../../Grid/GridItemHeader/util/track_obj_type";

type CreateTrackObjectProps = {
    trackerI : string,
    gridItemI: string,
    trackerType : string,
    gridItemType : string 
    gridItemId : string,
    trackerId : string,
}

const api_url = import.meta.env.VITE_API_URL;

export default function useMutateCreateTrackObject() {

    // hook int
    const csrf_token = useCsrf()
    const grid_id = useGridId()
    const queryClient = useQueryClient()

    // trakc obj hook init
    const addTrackObb = useAddTrackObj() 

    return useMutation({


        mutationFn: async ({trackerI, gridItemI, trackerType, gridItemType, trackerId, gridItemId} : CreateTrackObjectProps) => {

            console.log(gridItemId)

            if (!csrf_token) throw new Error('no csrf token')
            if (!trackerI  || !gridItemI || !trackerType || !gridItemType) throw new Error('missing props')
            if (!grid_id) throw new Error('No grid ID ')

            const newTrackObj : TrackObj = {
                trackerI:trackerI,
                gridItemI : gridItemI,
                gridId : grid_id,
                trackerId : trackerId,
                gridItemId :  gridItemId
            }

            // backend deals with if instance already exists
            try {
                const res = fetch(`${api_url}api/track_obj_${gridItemType}/`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "X-CSRFToken": csrf_token,
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({trackerI:trackerI, gridItemI : gridItemI, gridId : grid_id, trackerId: trackerId, gridItemId :  gridItemId})
                })
                

                const responseData = await (await res).json()

                addTrackObb(newTrackObj)

                return responseData



            }
            catch  {
                throw new Error(`connection already made for ${trackerI}, ${gridItemI}`)
            }
            
        },
        onSuccess : (_data, variables)  => {
            queryClient.invalidateQueries({
                queryKey: [`track-objs-all-${grid_id}`]
            })        
            queryClient.invalidateQueries({
                queryKey : [`tracker-connections-${variables.trackerI}`]
            })
        }
    })

}