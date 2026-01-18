import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../../../hooks/useCsrf";

// util
import { mutate_auth } from "../../../../../../util/mutate_auth";

type DeleteRawForm = {
    noteId : number
    rawObjectId : number
    lineNum : number
}

export default function useDeleteRawObject() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn : async ({noteId, rawObjectId, lineNum} : DeleteRawForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const init : RequestInit = {
                method : 'DELETE',
                body : JSON.stringify({
                    noteId : noteId,
                    rawObjectId : rawObjectId,
                    lineNum : lineNum
                })
            }

            return mutate_auth({
                queryUrl : `api/raw_objects/delete_raw_object/`,
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