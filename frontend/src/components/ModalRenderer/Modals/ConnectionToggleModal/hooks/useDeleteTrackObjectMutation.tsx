import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";
import { useDeleteTrackObj } from "../../../../stores/TrackObjectsStore/TrackObjectsStore";
import { useGridId } from "../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// utill
import { switchCaseTrackObjQuery } from "../ConnectionLi/util/switchCaseTrackObjQuery";
import { mutate_auth } from "../../../../util/mutate_auth";


type DeleteTrackObjectForm = {
    gridItemI : string
    trackObjId :string 
}


export default function useDeleteTrackObjectMutation() {

    // hook init
    const csrf_token = useCsrf()
    const deleteTrackObj = useDeleteTrackObj()
    const gridId = useGridId()
    const queryClient =  useQueryClient()

    return useMutation({
        mutationFn : async (deleteTrackObjectForm : DeleteTrackObjectForm ) => {

            if (!csrf_token) throw new Error('no csrf token found')
            if (!gridId) throw new Error('no grid id found')

            const trackObjQuery = switchCaseTrackObjQuery(deleteTrackObjectForm.gridItemI)

            const deleteTrackObject: RequestInit = {
                method: 'DELETE'
            }

            return mutate_auth({
                queryUrl : `api/${trackObjQuery}/${deleteTrackObjectForm.trackObjId}/`,
                init: deleteTrackObject,
                csrf_token : csrf_token
            })


        },
        onSuccess : (_data, variables) => {
            deleteTrackObj(variables.gridItemI)
            queryClient.invalidateQueries({
                queryKey: [`track-objs-all-${gridId}`]
            })
        }
    })


}