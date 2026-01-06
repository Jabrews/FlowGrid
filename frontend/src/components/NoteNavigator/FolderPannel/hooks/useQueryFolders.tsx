import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useGridId } from "../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// util
import { fetch_auth } from "../../../util/fetch_auth";

export default function useQueryFolders() {

    // hook init
    const csrf_token = useCsrf()
    const grid_id = useGridId()

    return useQuery({
        queryKey : ['folders',grid_id],
        queryFn : async () => {

            if (!csrf_token) throw new Error('no csrf token found')
            if (!grid_id) throw new Error('no grid_id found')

            const init : RequestInit = {
                method : 'Get'
            }

            // return fetch_auth({
            //     queryUrl : `api/`
            //     init : init,
            //     csrf_token : csrf_token,
            // })

        }
    })


}