import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useGridId } from "../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// utill
import { fetch_or_create } from "../../../util/fetch_or_create";
import type { Sticky } from "../util/sticky_types";

type QueryStickyProps = {
    stickyNoteI : string
}


export default function useQuerySticky({stickyNoteI} : QueryStickyProps) {{

    // hook init
    const csrf_token = useCsrf()
    const grid_id = useGridId()

    return useQuery<Sticky>({
        queryKey : ['sticky-note', stickyNoteI],
        queryFn : async () => {

            if (!csrf_token) throw new Error('no csrf token found')
            if (!grid_id) throw new Error('no grid id found')


            return fetch_or_create({
                queryUrl : 'sticky_notes/',
                gridId :  grid_id,
                i : stickyNoteI,
                csrf_token : csrf_token
            })



        }


    })


}}