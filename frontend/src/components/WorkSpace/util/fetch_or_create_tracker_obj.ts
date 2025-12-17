
type FetchProps = {
  queryUrl: string;
  csrf_token : string;
  gridItemI : string; 
  trackerI : string
  gridId : string,
};

const api_url = import.meta.env.VITE_API_URL;

export default async function fetch_or_create_tracker_obj({queryUrl, csrf_token, gridItemI, trackerI, gridId} : FetchProps) {

    try {
        if (!trackerI || !gridItemI || !gridId) throw new Error('no "i" or "gridId"');

        // GET request — NO init spread, NO body
        let res = await fetch(`${api_url}api/${queryUrl}findTrackerObjByI/${trackerI}/${gridItemI}`, {
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
                body: JSON.stringify({ trackerI, gridId }),
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
