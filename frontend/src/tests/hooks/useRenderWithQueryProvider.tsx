import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

type RenderOptions = {
  route?: string;
};

export function useRenderWithQueryProvider(
  children: ReactNode,
  { route = "/" }: RenderOptions = {}
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          {children}
        </CookiesProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
}
