import { useState, useEffect } from "react";

export function useUrlLocation() {
  const [location, setLocation] = useState(window.location);

  useEffect(() => {
    function handleChange() {
      setLocation(window.location);
    }

    // Fires when back/forward buttons are used
    window.addEventListener("popstate", handleChange);

    return () => window.removeEventListener("popstate", handleChange);
  }, []);

  return location;
}
