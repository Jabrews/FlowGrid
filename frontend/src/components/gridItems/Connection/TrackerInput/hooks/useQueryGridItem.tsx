import { useQuery } from "@tanstack/react-query"

// hooks
import useCsrf from "../../../../hooks/useCsrf";

type UseQueryGridItemProps = {
    gridItemI : string,
    gridItemType : string, 

}

const api_url = import.meta.env.VITE_API_URL;

export default function useQueryGridItem({gridItemI, gridItemType} : UseQueryGridItemProps) {

    // hook init
    const csrf_token = useCsrf()

    return useQuery({
        queryKey : [''],
        queryFn : async () => {


            if (!csrf_token) throw new Error('no csrf token')
            if (!gridItemI|| !gridItemType) throw new Error('missing props')

            const res = await fetch(`${api_url}api/${gridItemType == 'timer' ? 'timers' : gridItemType}/findGridItemByI/${gridItemI}`, {
                method: "get",
                credentials: "include",
                headers: {
                    "X-CSRFToken": csrf_token,
                    "Content-Type": "application/json",
                },
            })

            if (!res.ok) throw new Error('fetch failed')

            return await res.json()


        }
    })



}
