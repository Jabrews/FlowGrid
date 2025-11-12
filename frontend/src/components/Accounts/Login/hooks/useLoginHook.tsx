import { useQueryClient } from '@tanstack/react-query';

// hooks
import useGetCsrf from '../../../hooks/useGetCsrf';
import {useMutation} from '@tanstack/react-query'

type LoginData = {
    username : string;
    password : string;
}

const api_url = import.meta.env.VITE_API_URL

export default function useLoginHook() {

    // hook init
    const { data: csrfData } = useGetCsrf();
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (loginData: LoginData) => {

            if (!csrfData) {
                throw new Error("CSRF token not available");
            }

            console.log('csrf for login : ', csrfData.csrfToken)
        
            const res = await fetch(`${api_url}api/login/`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken' : csrfData.csrfToken,
                },
                body: JSON.stringify(loginData)
            });

            if (!res.ok) {
                const data = await res.json()
                console.error('Login failed:', data)
                throw new Error(data.error || data.message || 'Login failed')
            }

            const data = await res.json()
            console.log('Login successful:', data)
            return data
        },
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['csrftoken']})
        }
    })
}