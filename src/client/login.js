import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react/context';
import { HelmetProvider } from 'react-helmet-async';
import Login from 'routes/Login';
import { preloadDynamicImports } from 'kyt-runtime/client';
import client from './apolloClient';

preloadDynamicImports().then(() => {
  ReactDOM.hydrate(
    <HelmetProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route path="/login/:action?" component={Login} />
        </BrowserRouter>
      </ApolloProvider>
    </HelmetProvider>,
    document.getElementById('main')
  );
});
