import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";

// util
import { fetch_auth } from "../../../../util/fetch_auth";

type QueryTrackObjByItemIProps = {
    activeConnectionItemI : string
}

export default function useQueryTrackObjByItemI({activeConnectionItemI } : QueryTrackObjByItemIProps) {

    const csrf_token = useCsrf()

    return useQuery({
        queryKey : [`connections-${activeConnectionItemI}`],
        queryFn : async () => {

            if (!csrf_token) throw new Error('no csrf token found')

            const ByItemInit : RequestInit = {
                method : 'GET'
            }
            
            return fetch_auth({
                queryUrl : 
                    `api/track_obj_all/by-item/
                    ${activeConnectionItemI.replace(/-.*/, "")}/
                    ${activeConnectionItemI} 
                    `,
                init : ByItemInit,
                csrf_token : csrf_token
            })
        }
    })


}