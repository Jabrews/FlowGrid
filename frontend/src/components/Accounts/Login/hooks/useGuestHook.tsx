import { useQueryClient } from '@tanstack/react-query';

// hooks
import useGetCsrf from '../../../hooks/useGetCsrf';
import {useMutation} from '@tanstack/react-query'


const api_url = import.meta.env.VITE_API_URL

export default function useGuestHook() {

    // hook init
    const { data: csrfData } = useGetCsrf();
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {

            if (!csrfData) {
                throw new Error("CSRF token not available");
            }

            const res = await fetch(`${api_url}api/guest_login/`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken' : csrfData.csrfToken,
                },
            });

            if (!res.ok) {
                const data = await res.json()
                console.error('Guest Login failed:', data)
                throw new Error(data.error || data.message || 'Guest Login failed')
            }

            const data = await res.json()
            console.log('Guest Login successful:', data)
            return data
        },
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['csrftoken']})
        }
    })
}