import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../hooks/useCsrf";
import { useGridId } from "../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// util
import { mutate_auth } from "../../util/mutate_auth";
import type { Layout } from "../util/types";

export default function useMutateCreateLayout() {

    // hook init
    const csrf_token = useCsrf()
    const gridId = useGridId()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async (layout :  Layout) => {


            if (!csrf_token) throw new Error('Could not find csrf token')
            if (gridId == undefined) throw new Error('Could not find grid Id ')


            const createLayoutInit = {
                method : 'Post',
                body : JSON.stringify(layout),
            }

            return mutate_auth({
                queryUrl : `api/layout/${gridId}/`,
                init : createLayoutInit,
                csrf_token : csrf_token,
            })

        },
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['layout', gridId]})
        }
    })


}