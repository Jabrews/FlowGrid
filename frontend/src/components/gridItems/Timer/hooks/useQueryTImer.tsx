import { useQuery } from "@tanstack/react-query";

// hooks
import useCsrf from "../../../hooks/useCsrf";
import { useGridId } from "../../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

// util 
import { fetch_or_create } from "../../../util/fetch_or_create";

export default function useQueryTimer(i: string) {

    const csrf_token = useCsrf();
    const gridId = useGridId();

    return useQuery({
        queryKey: ["timer", i],
        queryFn: async () => {
            if (!csrf_token) throw new Error("No csrf token found");
            if (!gridId) throw new Error("No Grid Id found");

            return fetch_or_create({
                queryUrl : 'timers/',
                csrf_token : csrf_token,
                i : i,
                gridId : gridId,
            })



        },
    });
}