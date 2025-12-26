import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";

// utill
import { fetch_auth } from "../../../util/fetch_auth";
import type { TrackObj } from "../../../Grid/GridItemHeader/util/track_obj_type";

export default function useQueryTimeTrackObjs(timerI : string) {

    // hook init
    const csrf_token = useCsrf()


    return useQuery<TrackObj[]|undefined|[]>({
        queryKey :[`tracker-connections-${timerI}`],
        queryFn : async () => {

            if (!csrf_token) throw new Error('no csrf token')            
            if (!timerI) throw new Error('no timer i found')            

            const init : RequestInit = {
                method : 'GET'
            }


            return fetch_auth({
                queryUrl : `api/track_obj_timer/findTrackerObjsByTimerI/${timerI}`,
                init : init, 
                csrf_token : csrf_token
            })


        },
        refetchInterval: 60 * 1000, // 1 minute
        refetchOnWindowFocus: true
    })


}