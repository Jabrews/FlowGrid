import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";

// utill
import { mutate_auth } from "../../../util/mutate_auth";

type mutateTableForm = {
    tableI: string
    newName : string
    tableId : string
}


export default function useMutateTable() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async ({newName, tableId} : mutateTableForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const init : RequestInit = {
                method : 'Patch',
                body : JSON.stringify({name : newName}),
            }

            return mutate_auth({
                queryUrl : `api/tables/${tableId}`,
                init : init,
                csrf_token: csrf_token,
            })
        },
        onSuccess : (_data, variables) => {
            queryClient.invalidateQueries({queryKey : ['table', variables.tableI]})

        }
    })


}


