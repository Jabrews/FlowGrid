import { useMutation } from "@tanstack/react-query";
import { getCookie } from '../../util/get_cookie';

// hooks
import { useSetActiveFolderId } from "../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

const api_url = import.meta.env.VITE_API_URL;

export default function useLogout() {

    // hook init
    const setActiveFolderId = useSetActiveFolderId()

    return useMutation({
        mutationFn: async () => {
            // Get CSRF token from cookie
            const csrfToken = getCookie('csrftoken');
            if (!csrfToken) {
                throw new Error('CSRF token not found. Please refresh the page.');
            }

            const res = await fetch(`${api_url}/api/logout/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Logout failed');
            }

            const data = await res.json();
            return data;
        },
        onSuccess : () => {
            setActiveFolderId('')
        }
    });
}
