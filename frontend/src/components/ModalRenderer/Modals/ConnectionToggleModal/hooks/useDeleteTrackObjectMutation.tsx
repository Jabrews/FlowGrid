import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";
import { useDeleteTrackObj } from "../../../../stores/TrackObjectsStore/TrackObjectsStore";
import { useGridId } from "../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// utill
import type { TrackObj } from "../../../../Grid/GridItemHeader/util/track_obj_type";
import { switchCaseTrackObjQuery } from "../ConnectionLi/util/switchCaseTrackObjQuery";
import { mutate_auth } from "../../../../util/mutate_auth";



export default function useDeleteTrackObjectMutation() {

    // hook init
    const csrf_token = useCsrf()
    const deleteTrackObj = useDeleteTrackObj()
    const gridId = useGridId()
    const queryClient =  useQueryClient()

    return useMutation({
        mutationFn : async (trackObj : TrackObj) => {

            if (!csrf_token) throw new Error('no csrf token found')
            if (!gridId) throw new Error('no grid id found')

            const trackObjQuery = switchCaseTrackObjQuery(trackObj.gridItemI)

            const deleteTrackObject: RequestInit = {
                method: 'DELETE'
            }

            return mutate_auth({
                queryUrl : `api/${trackObjQuery}/${trackObj.id}/`,
                init: deleteTrackObject,
                csrf_token : csrf_token
            })


        },
        onSuccess : (_data, variables) => {
            deleteTrackObj(variables.gridItemI)
            queryClient.invalidateQueries({
                queryKey: [`track-objs-all-${gridId}`]
            })
            queryClient.invalidateQueries({
                queryKey : [`tracker-connections-${variables.trackerI}`]
            })
        }
    })


}