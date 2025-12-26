import { useMutation } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";

// utill
import { mutate_auth } from "../../../util/mutate_auth";
import type { TrackObj } from "../../../Grid/GridItemHeader/util/track_obj_type";
import track_obj_url_switch from "../utill/track_obj_url_switch";

type MutateTrackObjNameForm = {
    newCustomName : string,
    selectedTrackObj : TrackObj,
}


export default function useMutateTrackObjName() {

    // hook init
    const csrf_token = useCsrf()


    return useMutation({
        mutationFn : async (form : MutateTrackObjNameForm) => {

            if (!csrf_token) throw new Error('cant find csrf token')

                const MutateTrackObjInit : RequestInit = {
                    method : 'PATCH',
                    body : JSON.stringify({customName : form.newCustomName}),
                }

                const trackObjUrl = track_obj_url_switch(form.selectedTrackObj.gridItemI.replace(/-.*/, "")
)


                mutate_auth({
                    queryUrl : `api/${trackObjUrl}/${form.selectedTrackObj.id}/`,
                    init : MutateTrackObjInit,
                    csrf_token : csrf_token,
                })



        }

    })

}