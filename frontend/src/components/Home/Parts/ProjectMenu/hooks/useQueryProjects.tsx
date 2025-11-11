import { useQuery} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";
import { fetch_auth } from "../../../../util/fetch_auth";

export default function useQueryProjects(folderId : string) {

    // hook init
    const csrf_token = useCsrf()

    const QueryProjectsInit : RequestInit = {
        method : 'Get'
    }

    return useQuery({
        queryKey: ['projects', folderId],  
        queryFn: async () => {
        return await fetch_auth({
            queryUrl: `api/project_folders/${folderId}/projects/project_names`,
            init: QueryProjectsInit,
            csrf_token,
        })
        },
    })


}