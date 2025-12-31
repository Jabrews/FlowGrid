import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";

// util
import { mutate_auth } from "../../../util/mutate_auth";

type RowAddForm = {
    tableId : string
    parentElementI : string
}

export default function useRowAdd() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async ({tableId} : RowAddForm) => {

            if (!csrf_token) throw new Error('no csrf token')

            const init : RequestInit = {
                method : 'Post',
                body : JSON.stringify({
                    tableId : tableId,
                })
            }

            return mutate_auth({
                queryUrl : `api/rows/`,
                init : init,
                csrf_token: csrf_token
            })


        },
        onSuccess : (_data, variables) => {
            queryClient.invalidateQueries({queryKey : [`cells`, variables.parentElementI]})
        },
        retry: false,
    })


}