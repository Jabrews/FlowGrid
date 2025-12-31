import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";

// utill
import { mutate_auth } from "../../../../util/mutate_auth";
 
type MutateCellForm = {
    cellId : string
    newText : string
    tableId : string
    tableI : string
}

export default function useMutateCell() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn : async ({cellId, newText, tableId} : MutateCellForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const init : RequestInit = {
                method : 'PATCH',
                body : JSON.stringify({
                    text : newText ,
                    tableId : tableId,
                })
            }

            return mutate_auth({
                queryUrl : `api/cells/${cellId}/?tableId=${tableId}`,
                init : init,
                csrf_token : csrf_token,
            })


        },
        onSuccess : (_data, variables) => {
            queryClient.invalidateQueries({queryKey : [`cells`, variables.tableI]})
        }
    })


}