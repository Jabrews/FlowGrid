import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import useCsrf from "../../hooks/useCsrf";
import { useGridId } from "../../stores/ProjectAndFolderStore/ProjectAndFolderStore";

import type { Layout } from "../util/types";
import { fetch_auth } from "../../util/fetch_auth";

export default function useQueryLayout() {
  const csrf_token = useCsrf();
  const gridId = useGridId();

  const query = useQuery<Layout[]>({
    queryKey: ["layout", gridId],

    queryFn: async () => {
      if (!csrf_token) throw new Error("Missing CSRF");
      if (!gridId) throw new Error("Missing grid ID");

      return fetch_auth({
        queryUrl: `api/layout/${gridId}`,
        init: { method: "GET" },
        csrf_token,
      });
    },

    enabled: !!csrf_token && !!gridId,

    // load from localStorage first
    initialData: () => {
      if (!gridId) return undefined;
      try {
        const stored = localStorage.getItem(`layout-${gridId}`);
        return stored ? JSON.parse(stored) : undefined;
      } catch {
        return undefined;
      }
    },
  });

  // save to localStorage whenever query.data updates
  useEffect(() => {
    if (!gridId) return;
    if (!query.data) return;

    try {
      localStorage.setItem(`layout-${gridId}`, JSON.stringify(query.data));
    } catch {
      throw new Error('Issue setting layout in local storage')
    }
  }, [gridId, query.data]);

  return query;
}
