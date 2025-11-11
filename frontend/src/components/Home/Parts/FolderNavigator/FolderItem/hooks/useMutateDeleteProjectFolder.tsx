import { useMutation, useQueryClient } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../../hooks/useCsrf";
import { mutate_auth } from "../../../../../util/mutate_auth";

export default function useMutateDeleteProjectFolder() {

    const queryClient = useQueryClient()    
    const csrf_token = useCsrf()

    return useMutation({
        mutationFn : async (id : string) => {

            if (!csrf_token) throw new Error('couldnt find csrf token')

            const deleteProjectFolderInit : RequestInit = {
                method : 'DELETE',
                body : JSON.stringify(id),
            }

            mutate_auth({
                queryUrl : `api/project_folders/${id}/`,
                init: deleteProjectFolderInit,
                csrf_token : csrf_token,
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey : ['project_folders']})
        }
    })


}