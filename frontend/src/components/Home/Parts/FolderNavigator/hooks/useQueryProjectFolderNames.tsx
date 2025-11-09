import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";

// util
import { fetch_auth } from "../../../../util/fetch_auth";

export default function useQueryProjectFolderNames() {

    const csrfToken = useCsrf()

    return useQuery({
        queryKey : ['project_folders'],
        queryFn : async () => {

            if (!csrfToken) throw new Error('unable to find project folders') 

            const QueryProjectFolderNamesInit = {
                method : 'get',
            }

            return await fetch_auth({
                queryUrl : 'api/project_folders/folder_names',
                init : QueryProjectFolderNamesInit ,
                csrf_token : csrfToken,
            })






        }
    })



}