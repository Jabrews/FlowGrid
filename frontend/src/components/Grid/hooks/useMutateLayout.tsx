import { useMutation } from "@tanstack/react-query";

// hooks
import useCsrf from "../../hooks/useCsrf";
import { useGridId } from "../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// util
import { mutate_auth } from "../../util/mutate_auth";

type MutateLayoutForm = {
    id : string,
    x : number
    y : number,
    w : number,
    h : number
}


export default function useMutateLayout() {

    // hook init
    const csrf_token = useCsrf()
    const gridId = useGridId()


    return useMutation({
        mutationFn : async (layoutForm : MutateLayoutForm) => {

            if (!csrf_token) throw new Error('Could not find csrf token')
            if (!layoutForm.id) throw new Error('Could not find layout id')


            const mutateLayoutInit : RequestInit  = {
                method : 'PATCH',
                body :  JSON.stringify(layoutForm)
            }

            mutate_auth({
                queryUrl : `api/layout/${gridId}/${layoutForm.id}/`,
                init : mutateLayoutInit,
                csrf_token : csrf_token,
            })

        }
    })



}