import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useGridId } from "../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// util
import { mutate_auth } from "../../../util/mutate_auth";

type DeleteForm = {
    layoutId : string
}

export default function useMutateDeleteLayout() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()
    const gridId = useGridId()

    return useMutation({
        mutationFn : async (deleteForm : DeleteForm) => {

            if (!csrf_token) throw new Error('No csrf token')
            if (!gridId) throw new Error('Could not find grid ID')

            const DeleteGridItemInit : RequestInit = {
                method: 'DELETE'
            }

            return mutate_auth({
                queryUrl : `api/layout/${gridId}/${deleteForm.layoutId}/`,
                init: DeleteGridItemInit,
                csrf_token : csrf_token
            })


        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["layout", gridId],
            });
        },

    })

}