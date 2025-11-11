type MutateProps= {
  queryUrl: string;
  init?: RequestInit; 
  csrf_token : string;
};

const api_url = import.meta.env.VITE_API_URL;

export async function mutate_auth({ queryUrl, init = {}, csrf_token}: MutateProps) {

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

        if (!res.ok && init.method != 'DELETE') {
        const errorText = await res.text();
        console.error(" fetch_auth failed:", res.status, res.statusText);
        console.error(" Error response:", errorText);
        throw new Error(`Request failed with ${res.status}: ${errorText}`);
        }

        return await res.json();

    } catch (err) {

        if (init.method == 'DELETE') {
            return
        }

        console.error("error fetching with:", queryUrl, "\nerror body:", err);
        throw err;
    }
    }
