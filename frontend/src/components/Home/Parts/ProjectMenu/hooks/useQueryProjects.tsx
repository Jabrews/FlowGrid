import { useQuery} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";
import { fetch_auth } from "../../../../util/fetch_auth";

type QueryProjectsProps = {
    folderId : string | null
}


export default function useQueryProjects({folderId} : QueryProjectsProps) {

    // hook init
    const csrf_token = useCsrf()

    const QueryProjectsInit : RequestInit = {
        method : 'Get'
    }


    return useQuery({
        queryKey: ['projects', folderId],  
        queryFn: async () => {

        if (!csrf_token) throw new Error('could not find csrf token  ')
        if (!folderId) return

        return await fetch_auth({
            queryUrl: `api/project_folders/${folderId}/projects/project_names`,
            init: QueryProjectsInit,
            csrf_token,
        })
        },
        enabled : !!folderId,
    })


}