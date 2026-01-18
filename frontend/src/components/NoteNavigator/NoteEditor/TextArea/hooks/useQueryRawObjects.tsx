import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";

// utill
import { fetch_auth } from "../../../../util/fetch_auth";


type QueryRawObjProps = {
    noteId : number 
}

export default function useQueryRawObjects({noteId} : QueryRawObjProps) {

    // hook init
    const csrf_token = useCsrf()

    return useQuery({
        queryKey : ['raw-objs', noteId],
        queryFn : async () => {

            if (!csrf_token) throw new Error('no csrf token found')
            if (noteId == 0) return []


            return fetch_auth({
                queryUrl : `api/raw_objects/get_based_on_page_id/?noteId=${noteId}`,
                csrf_token : csrf_token, 
            })


        },
    })



}