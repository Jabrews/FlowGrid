import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

// util 
import useCsrf from "../../../../hooks/useCsrf"
import { mutate_auth } from "../../../../util/mutate_auth"

export default function useMutateCreateProjectFolder() {

    const csrfToken = useCsrf()

    // hook init
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async () => {

            if (!csrfToken) throw Error('could not find csrf token')

            const CreateProjectFolderInit : RequestInit = {
                method: 'Post',
            }

            return mutate_auth({
                queryUrl : 'api/project_folders/',
                init: CreateProjectFolderInit,
                csrf_token : csrfToken, 
            })
        },
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['project_folders']})            
        }
    })


}