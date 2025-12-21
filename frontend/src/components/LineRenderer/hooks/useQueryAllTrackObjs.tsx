import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../hooks/useCsrf";
import { useGridId } from "../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// utill
import { fetch_auth } from "../../util/fetch_auth";
import type { TrackObj } from "../../Grid/GridItemHeader/util/track_obj_type";

export default function useQueryAllTrackObjs() {

    // hook init
    const csrf_token = useCsrf()
    const gridId = useGridId()

    return useQuery<TrackObj[]>({
        queryKey: [`track-objs-all-${gridId}`],
        queryFn : async () => {

            if (!csrf_token) throw new Error('csrf token not found')
            if (!gridId) throw new Error('no gridId found')
// 
            const queryAllTrackObjsInit : RequestInit = {
                method : 'GET'
            }


            return fetch_auth({
                queryUrl : `api/track_obj_all/grid/${gridId.toString()}`,
                csrf_token : csrf_token,
                init : queryAllTrackObjsInit,
            })

        } 
    })

}