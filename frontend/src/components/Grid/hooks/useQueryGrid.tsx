import { useQuery } from "@tanstack/react-query";

// util
import { fetch_auth } from "../../util/fetch_auth";

// hooks 
import useCsrf from "../../hooks/useCsrf";
import { useActiveFolder } from "../../stores/NavbarStore/NavbarStore";
import { useActiveProject } from "../../stores/NavbarStore/NavbarStore";

export default function useQueryGrid() {

    // hook init
    const csrf_token = useCsrf()
    const active_folder = useActiveFolder()
    const active_project = useActiveProject()
    

    return useQuery({
        queryKey : ['Grid'],
        queryFn : async () => {

            if (!csrf_token) throw new Error('could not find csrf token')
            if (!active_folder || !active_project) throw new Error('could not find active folder or project')

            const QueryGridInit : RequestInit = {
                method : 'Get'
            }

            fetch_auth({
                queryUrl: `api/project_folders/${active_folder}/projects/${active_project}`,
            })

        }
    })


}