type FetchProps = {
  queryUrl: string;
  init?: RequestInit; 
  csrf_token : string;
  i : string; // special id for linking together layoutItem & elements
};

const api_url = import.meta.env.VITE_API_URL;

export async function fetch_or_create({ queryUrl, init = {}, csrf_token, i }: FetchProps) {

    console.log(i)

    try {

        const res = await fetch(`${api_url}${queryUrl}`, {
        ...init,
        credentials: "include", 
        headers: {
            "X-CSRFToken": csrf_token || '',
            "Content-Type": "application/json",
            ...init.headers,
        },
        });

        if (!res.ok) {
        const errorText = await res.text();
        console.error(" fetch_auth failed:", res.status, res.statusText);
        console.error(" Error response:", errorText);
        throw new Error(`Request failed with ${res.status}: ${errorText}`);
        }

        return await res.json();

    } catch (err) {

        console.error("error fetching with:", queryUrl);
        throw err;
    }
    }
