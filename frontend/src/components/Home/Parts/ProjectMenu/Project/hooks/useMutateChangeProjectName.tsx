import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../../hooks/useCsrf";
import { mutate_auth } from "../../../../../util/mutate_auth";

type ChangeProjectNameForm = {
    selectedFolderId : string,
    selectedProjectId : string,
    newName : string,
} 

export default function useMutateChangeProjectName() {

    // hook init
    const csrf_token = useCsrf()    
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async (ChangeProjectForm : ChangeProjectNameForm) => {

            if (!csrf_token) throw new Error('could not find csrf')

            const ChangeProjectNameInit : RequestInit = {
                method : 'PATCH',
                body : JSON.stringify({name: ChangeProjectForm.newName}),
            }

            return await mutate_auth({
                queryUrl: `api/project_folders/${ChangeProjectForm.selectedFolderId}/projects/${ChangeProjectForm.selectedProjectId}/`,
                init: ChangeProjectNameInit,
                csrf_token: csrf_token,
            })

        },
        onSettled: (_data, _error, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['projects', variables.selectedFolderId]
            })
        },


    })


}