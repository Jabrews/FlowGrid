import { useMutation, useQueryClient} from "@tanstack/react-query"


// hooks
import useCsrf from "../../../../../../hooks/useCsrf"

// utll
import { mutate_auth } from "../../../../../../util/mutate_auth"

type PatchRawObjForm = {
    lineNum : number
    rawObjectId : number
    noteId : number
    overloadedText : string
    rawObjectText : string,
}


export default function useSplitRawObject() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async ({lineNum, rawObjectId, noteId, rawObjectText, overloadedText} : PatchRawObjForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const init : RequestInit = {
                method : 'POST',
                body : JSON.stringify({
                    lineNum: lineNum,
                    rawObjectId : rawObjectId,
                    noteId : noteId,
                    rawObjectText: rawObjectText,
                    overloadedText : overloadedText
                }),
            }

            return mutate_auth({
                queryUrl : `api/raw_objects/split_raw_object/`,
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