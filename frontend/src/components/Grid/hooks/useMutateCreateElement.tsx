import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

// hooks
import useCsrf from "../../hooks/useCsrf";
import { mutate_auth } from "../../util/mutate_auth";

// util
import type { ItemProps } from "../util/types";

export default function useMutateCreateElement() {
    const queryClient = useQueryClient()
    const csrf_token = useCsrf()

    return useMutation({

        mutationFn: async (newElementType: string) => {
            if (!csrf_token) throw new Error('No csrf token found')

            const createElementInit: RequestInit = {
                method: 'Post',
                body: JSON.stringify(newElementType),
            }

            return mutate_auth({
                queryUrl: `api/layout/`, // you will fix this later
                init: createElementInit,
                csrf_token: csrf_token,
            })
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["layout"] })
            console.log('invalidating items, changr query when feature tabs') 
            queryClient.invalidateQueries({queryKey : ['items']})
        }
    })
}
