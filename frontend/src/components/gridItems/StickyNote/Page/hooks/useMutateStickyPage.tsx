import { useMutation, useQueryClient } from "@tanstack/react-query"

// hooks
import useCsrf from "../../../../hooks/useCsrf"

// utill
import { mutate_auth } from "../../../../util/mutate_auth"

type MutateStickyPageForm = {
    stickyNoteI : string,
    stickyNoteId : string,
    stickyPageId : string,
    newTitle : string,
}


export default function useMutateStickyPage() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn : async ({stickyNoteId, stickyPageId, newTitle} : MutateStickyPageForm) => {

            if (!csrf_token) throw new Error('no csrf token')

            const init : RequestInit = {
                method : 'PATCH',
                body : JSON.stringify({'title' : newTitle}),
            }

            return mutate_auth({
                queryUrl : `api/sticky_notes/${stickyNoteId}/pages/${stickyPageId}/`,
                init : init,                
                csrf_token : csrf_token,
            })

        },
        onSuccess : (_data, variables) => {
            queryClient.invalidateQueries({queryKey : ['sticky-note-page' , variables.stickyNoteI]})

        }

    })


}