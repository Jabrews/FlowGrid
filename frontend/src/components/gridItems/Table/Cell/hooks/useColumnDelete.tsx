import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";

// util
import { mutate_auth } from "../../../../util/mutate_auth";

type ColumnDeleteForm = {
    index : number,
    tableId : string
    parentElementI :string
}


export default function useColumnDelete() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async ({index, tableId} : ColumnDeleteForm) => {

            if (!csrf_token) throw new Error('no csrf token')

            const init : RequestInit = {
                method : 'DELETE',
                body : JSON.stringify({
                    index : index,
                    tableId : tableId
                })
            }

            return mutate_auth({
                queryUrl : `api/columns/deleteColumnByIndex/`,
                init : init,
                csrf_token: csrf_token
            })


        },
        onSuccess : (_data, variables) => {
            queryClient.invalidateQueries({queryKey : [`cells`, variables.parentElementI]})
            queryClient.invalidateQueries({queryKey : [`table`, variables.parentElementI]})

        }
    })


}