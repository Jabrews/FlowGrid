import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useGridId } from "../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";


export default function useQueryOrCreateNoteDirectory() {

    // hook init
    const csrf_token = useCsrf()
    const grid_id = useGridId()
    const api_url = import.meta.env.VITE_API_URL;

    return useQuery({
        queryKey : [`NoteDir`, grid_id],
        queryFn : async () => {

            if (!csrf_token) throw new Error('no csrf token found')
            if (!grid_id) throw new Error('no grid id found')

            // GET
            let res = await fetch(`${api_url}api/note_directories/?grid_id=${grid_id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                "Accept": "application/json",
                },
            });

            // CREATE only if not found
            if (res.status === 404) {
                res = await fetch(`${api_url}api/note_directories/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CSRFToken": csrf_token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({grid_id}),
                });
            }

            if(!res.ok) {
                throw new Error(`request failed: ${res.status}`)
            }

            return res.json()


        }
    })


}