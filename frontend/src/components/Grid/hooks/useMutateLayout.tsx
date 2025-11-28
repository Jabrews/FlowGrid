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

            return mutate_auth({
                queryUrl : `api/layout/${gridId}/${layoutForm.id}/`,
                init : mutateLayoutInit,
                csrf_token : csrf_token,
            })

        },
        onSuccess: (data) => {
            try {
                if (!gridId) return;

                const raw = localStorage.getItem(`layout-${gridId}`);
                if (!raw) {
                    localStorage.setItem(`layout-${gridId}`, JSON.stringify(data));
                    return;
                }

                const layout = JSON.parse(raw);
                for(let i = 0; i < layout.length; i++) {
                    if (layout[i].i == data.i) {
                        layout[i] = data
                    }

                }

                localStorage.setItem(`layout-${gridId}`, JSON.stringify(layout));

            } 
            catch (err) {
                console.error(err);
                throw new Error("Issue setting layout in local storage");
            }
            }

    })



}