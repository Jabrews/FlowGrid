import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

const api_url = import.meta.env.VITE_API_URL;

export default function useGetCsrf() {
  const [cookies, setCookie] = useCookies(["csrftoken"]);

  return useQuery({
    queryKey: ["csrftoken"],
    queryFn: async () => {
      const res = await fetch(`${api_url}api/csrf/`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.log('couldnt find csrf :', res)
        throw new Error("Could not fetch CSRF token");
      }

      const data = await res.json();

      if (data.csrfToken) {
        console.log(' csrf found', data.csrfToken)
        setCookie("csrftoken", data.csrfToken, { path: "/" });
      }

      return data;
    },
    // enabled: !cookies.csrftoken,
    staleTime: Infinity,
  });

}
