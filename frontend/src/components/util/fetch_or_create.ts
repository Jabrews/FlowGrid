
type FetchProps = {
  queryUrl: string;
  csrf_token : string;
  i : string; // special id for linking together layoutItem & elements
  gridId : string,
};

const api_url = import.meta.env.VITE_API_URL;

export async function fetch_or_create({queryUrl, csrf_token, i, gridId,}: FetchProps) {

  if (!i || !gridId) {
    throw new Error("missing i or gridId")
  }

  // GET
  let res = await fetch(`${api_url}api/${queryUrl}findGridItemByI/${i}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json",
    },
  });

  // CREATE only if not found
  if (res.status === 404) {
    res = await fetch(`${api_url}api/${queryUrl}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrf_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ i, gridId }),
    });
  }

  if (!res.ok) {
    throw new Error(`request failed: ${res.status}`)
  }

  return res.json();
}