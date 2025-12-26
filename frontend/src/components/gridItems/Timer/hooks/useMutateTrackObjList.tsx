import { useMutation, useQueryClient} from "@tanstack/react-query";


// hooks
import useCsrf from "../../../hooks/useCsrf";

// utill
import { mutate_auth } from "../../../util/mutate_auth";

type MutateTrackObjListForm = {
    trackObjIdList : string[]|undefined
    newTimeValue : number
    timeFieldName : string
    trackObjTrackerIList :string[]|undefined

}

// FOR timer PATCH
export default function useMutateTrackObjList() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn : async (form : MutateTrackObjListForm) => {

            if (!csrf_token) throw new Error('Could not find csrf token')
            if (form.trackObjIdList== undefined) throw new Error('could not find track objs')
            if (!['timespentSeconds', 'elaspedSeconds'].includes(form.timeFieldName)) {
                throw new Error('invalid time field name')
            }


            const mutateTrackObjListInit : RequestInit = {
                method : 'PATCH',
                body : JSON.stringify({
                    listTrackObjId : form.trackObjIdList,
                    newTimeValue : form.newTimeValue,
                    timeFieldName : form.timeFieldName,
                })
            }

            mutate_auth({
                queryUrl : `api/track_obj_timer/listUpdateTrackObj/`,
                init : mutateTrackObjListInit,
                csrf_token : csrf_token,
            })


         },
        onSuccess : async (_data, variables) => {
            if (!variables.trackObjTrackerIList) throw new Error('no track objs i found')
            variables.trackObjTrackerIList.map((trackerI) => {
                    queryClient.invalidateQueries({queryKey : [`tracker-connections-${trackerI}`]})
            })
        }




    })



}