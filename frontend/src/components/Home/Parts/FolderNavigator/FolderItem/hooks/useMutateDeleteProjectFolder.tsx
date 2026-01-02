import { useMutation, useQueryClient } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../../hooks/useCsrf";
import { mutate_auth } from "../../../../../util/mutate_auth";
import { useResetFolderId } from "../../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";


type DeleteProjectFolderForm = {
    id :string | null
}

export default function useMutateDeleteProjectFolder() {

    const queryClient = useQueryClient()    
    const csrf_token = useCsrf()
    const resetFolderId = useResetFolderId()

    return useMutation({
        mutationFn : async ({id} : DeleteProjectFolderForm) => {

            if (!csrf_token) throw new Error('couldnt find csrf token')

            const deleteProjectFolderInit : RequestInit = {
                method : 'DELETE',
                body : JSON.stringify(id),
            }

            return mutate_auth({
                queryUrl : `api/project_folders/${id}/`,
                init: deleteProjectFolderInit,
                csrf_token : csrf_token,
            })
        },
        onSuccess: (_data, variables) => {
            resetFolderId()
            queryClient.invalidateQueries({queryKey : ['project_folders']})
            queryClient.invalidateQueries({queryKey : ['projects', variables.id]})
        }
    })


}