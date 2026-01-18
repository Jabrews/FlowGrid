import { useMutation, useQueryClient} from "@tanstack/react-query"


// hooks
import useCsrf from "../../../../../../hooks/useCsrf"

// utll
import { mutate_auth } from "../../../../../../util/mutate_auth"

type PatchRawObjForm = {
    text : string,
    rawObjectId : string,
    noteId : string,
    maxCharLengthRef : React.RefObject<number> 
}

// helper func
const handleIndentPossible= (text : string, maxCharLengthRef : React.RefObject<number>) => {


    const spacePossible = maxCharLengthRef.current - text.length
    if (spacePossible  >= 4 ) return true
    return false

}


export default function useHandleIndentFoward() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async ({text, rawObjectId, maxCharLengthRef} : PatchRawObjForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const possible = handleIndentPossible(text, maxCharLengthRef)
            if (!possible) {
                return
            } 
            const newText = `    ${text}`


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
            queryClient.invalidateQueries({queryKey : ['raw-objs', Number(variables.noteId)]})
        }
    })








}