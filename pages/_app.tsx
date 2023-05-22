import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRef } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const clientRef = useRef<QueryClient>();
  if (!clientRef.current) {
    clientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={clientRef.current}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp
