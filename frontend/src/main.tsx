import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CookiesProvider } from 'react-cookie';

import './styles/main.scss'

const queryClient = new QueryClient()

// yo test delete me 

console.log('yoooo')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <CookiesProvider >
        <App />
      </CookiesProvider>
    </QueryClientProvider>
  </StrictMode>,
)
