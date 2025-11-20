import { useMutation } from "@tanstack/react-query";

// hooks
import useCsrf from "../../hooks/useCsrf";
import 

// util
import { mutate_auth } from "../../util/mutate_auth";

export default function useMutateLayout() {

    // hook init
    const csrf_token = useCsrf()


    return useMutation({
        mutationFn : async () => {

            if (!csrf_token) throw new Error('Could not find csrf token')

            const mutateLayoutInit : RequestInit  = {
                method : 'Post',
                body : '',
            }

            mutate_auth({
                queryUrl : ``
                init : mutateLayoutInit,
                csrf_token : csrf_token,
            })

        }
    })



}