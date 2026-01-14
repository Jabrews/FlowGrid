import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../hooks/useCsrf";
import { useGridId } from "../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// utill
import { mutate_auth } from "../../../../util/mutate_auth";

type CreateNoteForm = {
    note_directory_id : string,
    folder_id : string,
}

export default function useCreateNote() {

    // hook init
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()
    const grid_id = useGridId()

    return useMutation({
        mutationFn : async ({note_directory_id, folder_id} : CreateNoteForm) => {

            if (!csrf_token) throw new Error('no csrf found')

            const init : RequestInit = {
                method: 'Post',
                body : JSON.stringify({title : 'note'})
            }

            return mutate_auth({
                queryUrl : `api/note_directories/${note_directory_id}/folders/${folder_id}/notes/`,
                init : init,
                csrf_token:csrf_token
            })

        }, 
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['NoteDir',grid_id]})
        }
    })

}