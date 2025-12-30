import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks 
import useCsrf from "../../../../hooks/useCsrf";

// utill
import { mutate_auth } from "../../../../util/mutate_auth";

type QueryLineForm = {
    stickyNoteI : string,
    stickyNoteId : string,
    stickyPageId : string,
}

export default function useCreateLine(){

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({stickyNoteId, stickyPageId} : QueryLineForm) => {

            if (!csrf_token) throw new Error('no csrf token found')            

            const init : RequestInit = {
                method : 'POST'
            }

            return mutate_auth({
                queryUrl : `api/sticky_notes/${stickyNoteId}/pages/${stickyPageId}/lines/`,
                init : init,
                csrf_token : csrf_token,
            })


        },
        onSuccess : (_data, variables ) => {
            queryClient.invalidateQueries({queryKey : ['sticky-note-line', variables.stickyNoteI]})
        }
    })


}