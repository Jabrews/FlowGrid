import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../hooks/useCsrf";
import { useGridId } from "../../stores/ProjectAndFolderStore/ProjectAndFolderStore";
import { useGridUrl } from "../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// utill 
import { fetch_auth } from "../../util/fetch_auth";

export default function useQueryGridItems() {

    // hook init
    const csrf_token = useCsrf()
    const gridId = useGridId()
    const gridUrl = useGridUrl()


    return useQuery({
        queryKey : ['grid-items'],
        queryFn : async () => {

            if (!csrf_token) throw new Error('Could not find csrf token')
            if (gridId == undefined) throw new Error('Could not find grid Id')

            const queryGridItemsInit : RequestInit = {
                method: 'Get'
            }

            return fetch_auth({
                queryUrl : `api/${gridUrl}/grid/${gridId}/items/`,
                init : queryGridItemsInit,
                csrf_token : csrf_token,
            })

        }
    })



}