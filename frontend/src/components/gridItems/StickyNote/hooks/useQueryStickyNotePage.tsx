import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";

// utill
import { fetch_auth } from "../../../util/fetch_auth";
import type { StickyPage } from "../util/sticky_types";

type StickyPageProps = {
    stickyNoteI : string
    stickyNoteId : number | undefined
}


export default function useQueryStickyNotePage({stickyNoteI, stickyNoteId} : StickyPageProps) {

    // hook init    
    const csrf_token = useCsrf()

    return useQuery<StickyPage[]>({
        queryKey : [`sticky-note-page-${stickyNoteI}`],
        queryFn : async () => {
 
            if (!csrf_token) throw new Error('no csrf token found')
            if (!stickyNoteId) throw new Error('no sticky id')

            const init : RequestInit = {
                method : 'GET'
            }

            return fetch_auth({
                queryUrl : `api/sticky_notes/${String(stickyNoteId)}/pages/`,
                init : init,
                csrf_token : csrf_token,
            })


        }, 
        enabled: !!stickyNoteId,
    })



}