import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useDeleteTrackObj, useGetTrackerIFromItem} from "../../../stores/TrackObjectsStore/TrackObjectsStore";
import { useGridId } from "../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// util
import { mutate_auth } from "../../../util/mutate_auth";

type DeleteForm = {
    type: string,
    i : string,
}


export default function useMutateDeleteGridItem() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()
    const gridId = useGridId()

    // track obj store hook init
    const deleteTrackObj = useDeleteTrackObj()
    const getTrackerIFromItem = useGetTrackerIFromItem()

    return useMutation({
        mutationFn : async (deleteForm : DeleteForm) => {

            if (!csrf_token) throw new Error('No csrf token')
            if (!gridId) throw new Error('no gridId found')

            const DeleteGridItemInit : RequestInit = {
                method: 'DELETE'
            }

            return mutate_auth({
                // kinda hacky but adding "s" should work 
                queryUrl : `api/${deleteForm.type}s/deleteGridItemByI/${deleteForm.i}/`,
                init: DeleteGridItemInit,
                csrf_token : csrf_token
            })
        },
        onSuccess: (_data, variables) => {
            // objects itself query
            queryClient.invalidateQueries({
                queryKey: [variables.type, variables.i],
            });
            // all track obs (for line renderer)
            queryClient.invalidateQueries({
                queryKey: [`track-objs-all-${gridId}`]
            })
            // if a connection then invalidate tracker KINDA TRICKY
            if (variables.type != 'tracker') {
                // get possibe tracker I array
                const trackerIArray: string[] | false = getTrackerIFromItem(variables.i)
                if (trackerIArray) {
                    trackerIArray.map((trackerI: string) => {
                        queryClient.invalidateQueries({
                            queryKey: [`tracker-connections-${trackerI}`]
                        })
                    })
                }
            }
            // finally for line renderer ls
            deleteTrackObj(variables.i)
        },
    })

}