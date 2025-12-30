import { useQuery } from "@tanstack/react-query";

// hooks 
import useCsrf from "../../../../hooks/useCsrf";

// utill
import { fetch_auth } from "../../../../util/fetch_auth"; 

type QueryLineProps = {
    stickyNoteI : string,
    stickyNoteId : string,
    stickyPageId : string,
}

export default function useQueryLine({stickyNoteId, stickyPageId,stickyNoteI}: QueryLineProps){

    // hook init    
    const csrf_token = useCsrf()

    return useQuery({
        queryKey : ['sticky-note-line', stickyNoteI],
        queryFn : async () => {

            if (!csrf_token) throw new Error('no csrf token found')            

            const init : RequestInit = {
                method : 'GET'
            }

            return fetch_auth({
                queryUrl : `api/sticky_notes/${stickyNoteId}/pages/${stickyPageId}/lines`,
                csrf_token : csrf_token,
                init : init,
            })


        }
    })


}