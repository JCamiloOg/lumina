import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LoaderProvider } from './app/providers/Loader.provider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UserProvider from './app/providers/User.provider.tsx';
import CartProvider from './app/providers/Cart.provider.tsx';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <UserProvider>

        <CartProvider>

          <LoaderProvider>

            <App />
          </LoaderProvider>

        </CartProvider>

      </UserProvider>

    </QueryClientProvider>
  </StrictMode >,
);
