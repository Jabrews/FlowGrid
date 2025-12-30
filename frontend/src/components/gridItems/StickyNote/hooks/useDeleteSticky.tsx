import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";

// utill 
import { mutate_auth } from "../../../util/mutate_auth";

type DeleteStickyForm = {
    stickyId : string,
    stickyPageId : string,
    stickyI : string,
}
export default function useDeleteSticky() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn : async ({stickyId, stickyPageId} : DeleteStickyForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const init : RequestInit = {
                method : 'DELETE'
            }

            return mutate_auth({
                queryUrl : `api/sticky_notes/${stickyId}/pages/${stickyPageId}/`,
                init : init ,
                csrf_token : csrf_token,
            })

        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({queryKey : ['sticky-note-page', variables.stickyI]})
        },
        retry: false,



    })


}