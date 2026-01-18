import { useMutation, useQueryClient} from "@tanstack/react-query"


// hooks
import useCsrf from "../../../../../../hooks/useCsrf"

// utll
import { mutate_auth } from "../../../../../../util/mutate_auth"

type PatchRawObjForm = {
    text : string,
    rawObjectId : string,
    noteId : string,
}


export default function useHandleIndentBackward() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async ({text, rawObjectId} : PatchRawObjForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            // first see how much text exist before first char.
            let nonSpaceCharIndex : number | null = null
            for (let i = 0; nonSpaceCharIndex == null; i++) {
                if (text[i] !== ' ') {
                    nonSpaceCharIndex = i
                }
            }
            if (!nonSpaceCharIndex) return
            // if more than 4 transfer foward

            // split char to take out 4 spaces behinde str start
            const backwardIndexStart = nonSpaceCharIndex - 4 
            const stringFirstPart = text.slice(0, backwardIndexStart)
            const stringSecondPart = text.slice(nonSpaceCharIndex)

            const newText = stringFirstPart + stringSecondPart

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