import { useMutation, useQueryClient} from "@tanstack/react-query"


// hooks
import useCsrf from "../../../../../../hooks/useCsrf"

// utll
import { mutate_auth } from "../../../../../../util/mutate_auth"

type PatchRawObjForm = {
    newText : string
    rawObjectId : number
    noteId : number
}


export default function usePatchRawObjectText() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async ({newText, rawObjectId} : PatchRawObjForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const init : RequestInit = {
                method : 'PATCH',
                body : JSON.stringify({text : newText}),
            }

            return mutate_auth({
                queryUrl : `api/raw_objects/${rawObjectId}/`,
                init : init,
                csrf_token : csrf_token
            })


        },
        onSuccess : (_data, variables) => {
            // queryClient.invalidateQueries({queryKey : [`raw-objs-${variables.noteId}`]})
            queryClient.invalidateQueries({queryKey : ['raw-objs', variables.noteId]})

        }
    })








} 