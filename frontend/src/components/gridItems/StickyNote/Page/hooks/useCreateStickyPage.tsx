import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";

// utill 
import { mutate_auth } from "../../../../util/mutate_auth";

type CreateStickyPageForm = {
    stickyId : string,
    stickyI : string,
}

export default function useCreateStickyPage() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn : async ({stickyId} : CreateStickyPageForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const init : RequestInit = {
                method : 'POST'
            }

            mutate_auth({
                queryUrl : `api/sticky_notes/${stickyId}/pages/`,
                init : init ,
                csrf_token : csrf_token,
            })



        },
        onSuccess : (_data, variables) => {
            queryClient.invalidateQueries({queryKey : [`sticky-note-page-${variables.stickyI}`]})

        }



    })


}