import type { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import {render} from '@testing-library/react'



export function useRenderWithQueryProvider(element: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
      {element}
      </CookiesProvider>
    </QueryClientProvider>
  );
}