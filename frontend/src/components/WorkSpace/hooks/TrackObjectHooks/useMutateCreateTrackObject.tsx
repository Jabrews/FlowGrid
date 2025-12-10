import { useMutation} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useGridId } from "../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";


type CreateTrackObjectProps = {
    trackerI : string,
    gridItemI: string,
    trackerType : string,
    gridItemType : string 
}

const api_url = import.meta.env.VITE_API_URL;

export default function useMutateCreateTrackObject() {

    // hook int
    const csrf_token = useCsrf()
    const grid_id = useGridId()

    return useMutation({


        mutationFn: async ({trackerI, gridItemI, trackerType, gridItemType} : CreateTrackObjectProps) => {

            if (!csrf_token) throw new Error('no csrf token')
            if (!trackerI  || !gridItemI || !trackerType || !gridItemType) throw new Error('missing props')
            if (!grid_id) throw new Error('No grid ID ')

            // try to fetch first
            try {
                console.log(gridItemI)
                const res = fetch(`${api_url}api/track_obj_${gridItemType}/`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "X-CSRFToken": csrf_token,
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({trackerI:trackerI, gridItemI : gridItemI, gridId : grid_id})
                })
                return (await res).json()
            }
            catch  {
                throw new Error(`connection already made for ${trackerI}, ${gridItemI}`)
            }
            
        },
    })

}