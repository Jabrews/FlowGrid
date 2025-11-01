import { useMutation } from "@tanstack/react-query";
import { getCookie } from '../../../util/get_cookie';

type SignupData = {
    username : string,
    password : string,
    email : string,
}

const api_url = import.meta.env.VITE_API_URL

export default function useSignupHook() {
    return useMutation({
        mutationFn : async (signupData : SignupData) => {
            // Get CSRF token from cookie
            const csrfToken = getCookie('csrftoken');
            if (!csrfToken) {
                throw new Error('CSRF token not found. Please refresh the page.');
            }

            const res = await fetch(`${api_url}/api/signup/`, {
                method : 'POST',
                credentials : 'include',
                headers : {
                    'Content-Type' : 'application/json',
                    'X-CSRFToken' : csrfToken,
                },
                body : JSON.stringify(signupData)
            })

            if (!res.ok) {
                const data = await res.json()
                throw Error(data.error || 'unknown error')
            }

            const data = await res.json()
            return data
        }
    })
}