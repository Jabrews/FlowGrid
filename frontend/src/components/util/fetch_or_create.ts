
type FetchProps = {
  queryUrl: string;
  csrf_token : string;
  i : string; // special id for linking together layoutItem & elements
  gridId : string,
};

const api_url = import.meta.env.VITE_API_URL;

export async function fetch_or_create({ queryUrl, csrf_token, i, gridId }: FetchProps) {


    try {
        if (!i || !gridId) throw new Error('no "i" or "gridId"');

        // GET request — NO init spread, NO body
        let res = await fetch(`${api_url}api/${queryUrl}findGridItemByI/${i}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "X-CSRFToken": csrf_token,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.log("fetch failed, creating");

            // POST request — THIS is the only place init should be used
            res = await fetch(`${api_url}api/${queryUrl}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CSRFToken": csrf_token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ i, gridId }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Request failed with ${res.status}: ${errorText}`);
            }

            return await res.json();
        }

        return await res.json();

    } catch (err) {
        console.error("error fetching with:", queryUrl, "error:", err);
        throw err;
    }
}