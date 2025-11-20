import { useQuery } from "@tanstack/react-query";

// util
import { fetch_auth } from "../../util/fetch_auth";

// hooks 
import useCsrf from "../../hooks/useCsrf";
import { useGridUrl } from "../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

export default function useQueryGrid() {

    // hook init
    const csrf_token = useCsrf()
    const gridUrl = useGridUrl()
    

    return useQuery({
        queryKey : ['grid'],
        queryFn : async () => {
            if (!csrf_token) throw new Error('could not find csrf token')
            if (!gridUrl) throw new Error('could not find grid url')

            const QueryGridInit : RequestInit = {
                method : 'GET'
            }

            return  fetch_auth({
                queryUrl: `api/${gridUrl}/grid/`,
                init : QueryGridInit,
                csrf_token : csrf_token,
            })


            
        },
    })

}