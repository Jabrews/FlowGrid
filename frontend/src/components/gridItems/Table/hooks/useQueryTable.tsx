import { useQuery} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useGridId } from "../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// utill
import { fetch_or_create } from "../../../util/fetch_or_create";

type CreateTableProps = {
    parentElementI : string
}

export default function useQueryTable({parentElementI} : CreateTableProps) {

    // hook init
    const csrf_token = useCsrf()
    const grid_id = useGridId()

    return useQuery({
        queryKey : ['table',parentElementI],
        queryFn: async () => {

            if (!csrf_token) throw new Error('no csrf token found')

            return fetch_or_create({
                queryUrl : `tables/`,
                csrf_token: csrf_token,
                i : parentElementI,
                gridId : grid_id,
            })
        }
    })


}