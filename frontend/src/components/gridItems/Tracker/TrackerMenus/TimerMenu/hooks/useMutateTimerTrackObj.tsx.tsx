import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../../hooks/useCsrf";

// utill
import { mutate_auth } from "../../../../../util/mutate_auth";

type PatchTrackObjForm = {
    newSeconds: number
    type : 'elasped' | 'timespent'
    trackObjId : string,
    trackObjI : string,
    gridItemI : string, 
}


// FOR TRACKER MENU
export default function useMutateTimerTrackObj() {

    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async (form : PatchTrackObjForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const body =
            form.type === 'elasped'
                ? { elaspedSeconds: form.newSeconds }
                : { timespentSeconds: form.newSeconds }

            const MutateInit: RequestInit = {
            method: 'PATCH',
            body: JSON.stringify(body),
            }

            return mutate_auth({
            queryUrl: `api/track_obj_timer/${form.trackObjId}/`,
            init: MutateInit,
            csrf_token: csrf_token,
            })

        },
        onSuccess : (_data, variables) => {
            queryClient.invalidateQueries({queryKey : [`tracker-connections-${variables.trackObjI }`]})
            queryClient.invalidateQueries({queryKey : [`tracker-connections-${variables.gridItemI}`]})

        }
    })

}