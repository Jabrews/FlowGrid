import { useCookies } from "react-cookie"

// custom hook for getting csrf cookie
export default function useCsrf() {

    const [cookies, ] = useCookies(["csrftoken"]);
    return cookies.csrftoken

}