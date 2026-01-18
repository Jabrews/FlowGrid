import { useMutation, useQueryClient} from "@tanstack/react-query"

// hooks
import useCsrf from "../../../../../../hooks/useCsrf"

// utll
import { mutate_auth } from "../../../../../../util/mutate_auth"

type CreateRawObjectForm = {
    lineNum : number
    noteId : number
}


export default function useCreateRawObject() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async ({lineNum, noteId} : CreateRawObjectForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const init : RequestInit = {
                method : 'POST',
                body : JSON.stringify({
                    lineNum: lineNum,
                    noteId : noteId,
                }),
            }

            return mutate_auth({
                queryUrl : `api/raw_objects/`,
                init : init,
                csrf_token : csrf_token
            })


        },
        onSuccess : (_data, variables) => {
            queryClient.invalidateQueries({queryKey : ['raw-objs', variables.noteId]})

        },
        retry : 1,
    })








}