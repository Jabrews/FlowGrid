import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";

// utill
import { fetch_auth } from "../../../util/fetch_auth";

type QueryCellsProps = {
    parentElementI : string,
    tableId : string
}

export default function useQueryCells({parentElementI, tableId} : QueryCellsProps) {

    // hook init
    const csrf_token = useCsrf()

    return useQuery({
        queryKey : [`cells`, parentElementI],
        queryFn : async () => {

            if (!csrf_token) throw new Error('no csrf token found')


            const init : RequestInit = {
                method : 'GET',
            }

            return fetch_auth({
                queryUrl : `api/cells/?tableId=${tableId}`,
                init : init,
                csrf_token : csrf_token,
            })
        },
    })

}