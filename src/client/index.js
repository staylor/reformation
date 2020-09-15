import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { HelmetProvider } from 'react-helmet-async';
import { preloadDynamicImports } from 'kyt-runtime/client';
import App from 'routes/App';
import client from './apolloClient';

preloadDynamicImports().then(() => {
  ReactDOM.hydrate(
    <HelmetProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </HelmetProvider>,
    document.getElementById('main')
  );
});

// enable Hot Module Replacement (HMR) via Webpack polling
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept();
}
