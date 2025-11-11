import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../../hooks/useCsrf";
import { mutate_auth } from "../../../../../util/mutate_auth"; 


type MutatePatchProjectFolder = {
    folderId : string,
    newText : string,
}

export default function useMutatePatchProjectFolder() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async (patchProjectFolderForm : MutatePatchProjectFolder) => {

            if (!csrf_token) throw new Error('could not find csrf token')

            const patchProjectFolderInit : RequestInit = {
                method : 'PATCH',
                body : JSON.stringify({name :patchProjectFolderForm.newText}),
            }

            return await mutate_auth({
                queryUrl: `api/project_folders/${patchProjectFolderForm.folderId}/`,
                init: patchProjectFolderInit,
                csrf_token : csrf_token
            }) 
        },
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey: ['project_folders']})
        } 

    }) 

}