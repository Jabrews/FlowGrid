import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useGridId } from "../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// utill
import { fetch_or_create } from "../../../util/fetch_or_create";

export default function useQueryTracker(i : string) {

    // hook init
    const csrf_token = useCsrf()
    const gridId = useGridId()

    return useQuery({
        queryKey : ['tracker', i],
        queryFn : async () => {
            if (!csrf_token) throw new Error('Could not find csrf token')
            if (!i) throw new Error('Could not find "i" ')
            if (!gridId) throw new Error('COuld not find grid Id')


            return fetch_or_create({
                queryUrl : 'tracker/',
                csrf_token : csrf_token,
                i : i,
                gridId : gridId,
            })

        }
    })    

}