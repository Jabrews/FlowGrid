import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../hooks/useCsrf";
import { useActiveProjectId } from "../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// util
import type { Layout } from "../util/types";
import { fetch_auth } from "../../util/fetch_auth";

export default function useQueryLayout() {

    // hook init
    const csrf_token = useCsrf()
    const projectId = useActiveProjectId()


    return useQuery<Layout[]>({
        queryKey : ['layout'],
        queryFn : async () => {
            if (!csrf_token) throw new Error('Can not find csrf_token')

            const queryLayoutInit : RequestInit = {
                method : 'Get',
            } 

            return fetch_auth({
                queryUrl : `api/layout/${projectId}`,
                init : queryLayoutInit,
                csrf_token : csrf_token,
            })

        }
    })



}
