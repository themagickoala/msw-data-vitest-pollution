import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';
import { server } from '../msw/mocks/server';
import { isNodeProcess } from 'is-node-process';
import { SetupServer } from 'msw/lib/node';
import { SetupWorker } from 'msw';
import { seed } from '../msw/data';

function MyApp({ Component, pageProps }: AppProps) {
  const clientRef = useRef<QueryClient>();

  if (!clientRef.current) {
    clientRef.current = new QueryClient();
  }

  if (isNodeProcess()) {
    (server as SetupServer).listen();
  } else {
    (server as SetupWorker).start();
  }

  seed();
  
  return (
    <QueryClientProvider client={clientRef.current}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp
