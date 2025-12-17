import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useDeleteTrackObj } from "../../../stores/TrackObjectsStore/TrackObjectsStore";

// util
import { mutate_auth } from "../../../util/mutate_auth";

type DeleteForm = {
    type: string,
    i : string,
}


export default function useMutateDeleteGridItem() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    // track obj store hook init
    const deleteTrackObj = useDeleteTrackObj()

    return useMutation({
        mutationFn : async (deleteForm : DeleteForm) => {

            if (!csrf_token) throw new Error('No csrf token')

            const DeleteGridItemInit : RequestInit = {
                method: 'DELETE'
            }

            return mutate_auth({
                // kinda hacky but adding "s" should work 
                queryUrl : `api/${deleteForm.type}s/deleteGridItemByI/${deleteForm.i}/`,
                init: DeleteGridItemInit,
                csrf_token : csrf_token
            })
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [variables.type, variables.i],
            });

            deleteTrackObj(variables.i)
        },
    })

}