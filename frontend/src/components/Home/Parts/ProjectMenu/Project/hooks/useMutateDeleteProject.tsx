import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../../hooks/useCsrf";
import { mutate_auth } from "../../../../../util/mutate_auth";

type DeleteProjectForm = {
    activeFolderId : string,
    activeProjectId : string,
}
    
export default function useMutateDeleteProject() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async (deleteProjectForm : DeleteProjectForm) => {

            if (!csrf_token) throw new Error('Could not find csrf')

            const DeleteProjectInit : RequestInit = {
                method : 'DELETE',
            }

            return await mutate_auth({
                queryUrl: `api/project_folders/${deleteProjectForm.activeFolderId}/projects/${deleteProjectForm.activeProjectId}/`,
                init : DeleteProjectInit,
                csrf_token : csrf_token,
            })


        },
        onSettled: (_data, _error, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['projects', variables.activeProjectId]
            })
            queryClient.invalidateQueries({queryKey : ['projects', variables.activeFolderId]})
        },




    })

}
