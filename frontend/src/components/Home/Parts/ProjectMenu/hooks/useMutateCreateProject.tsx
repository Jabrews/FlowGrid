import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";
import { mutate_auth } from "../../../../util/mutate_auth";


export default function useMutateCreateProject() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async (folderId : string) => {

            const createProjectInit : RequestInit = {
                method : 'Post'
            }



            return await mutate_auth({
                queryUrl: `api/project_folders/${folderId}/projects/`,
                init: createProjectInit,
                csrf_token : csrf_token
            })


        },
        onSuccess: (_data, folderId) => {
        queryClient.invalidateQueries({ queryKey: ['projects', folderId] })
        }


    })

}