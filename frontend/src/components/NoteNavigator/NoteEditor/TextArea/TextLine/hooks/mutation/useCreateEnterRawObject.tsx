import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../../../hooks/useCsrf";

// util
import { mutate_auth } from "../../../../../../util/mutate_auth";

type CreateRawForm = {
    noteId : number
    lineNum : number
}

export default function useCreateEnterRawObject() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async ({noteId, lineNum} : CreateRawForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const init : RequestInit = {
                method : 'POST',
                body : JSON.stringify({
                    noteId : noteId,
                    lineNum : lineNum,
                })
            }

            return mutate_auth({
                queryUrl : `api/raw_objects/create_under_current/`,
                init : init,
                csrf_token : csrf_token
            })


        },
        onSuccess : (_data, variables) => {
            queryClient.invalidateQueries({queryKey : ['raw-objs', variables.noteId]})
        }


    })
}