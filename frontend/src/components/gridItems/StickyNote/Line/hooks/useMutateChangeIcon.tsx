import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";

// utill
import { mutate_auth } from "../../../../util/mutate_auth";

type MutateChangeIconForm = {
    stickyI : string,
    stickyId : string,
    pageId : string,
    lineId : string,

}


export default function useMutateChangeIcon() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async ({stickyId, pageId, lineId} : MutateChangeIconForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const init : RequestInit = {
                method : 'PATCH'
            }

            return mutate_auth({
                queryUrl : `api/sticky_notes/${stickyId}/pages/${pageId}/lines/${lineId}/changeIconType/`,
                init : init,
                csrf_token : csrf_token,
            })

        },
        onSuccess : (_data, variables) => {
            queryClient.invalidateQueries({queryKey : [`sticky-note-line`, variables.stickyI]})
        }
    })


}