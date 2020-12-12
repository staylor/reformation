import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react/context';
import { HelmetProvider } from 'react-helmet-async';
import { preloadDynamicImports } from 'kyt-runtime/client';
import Admin from 'routes/Admin';
import client from './apolloClient';

preloadDynamicImports().then(() => {
  ReactDOM.hydrate(
    <HelmetProvider>
      <ApolloProvider client={client}>
        <BrowserRouter basename="/admin">
          <Admin />
        </BrowserRouter>
      </ApolloProvider>
    </HelmetProvider>,
    document.getElementById('main')
  );
});
