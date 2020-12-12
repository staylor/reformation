import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react/context';
import { HelmetProvider } from 'react-helmet-async';
import { DynamicImports } from 'kyt-runtime/server';
import App from 'routes/App';

export default (req, res, next) => {
  const staticContext = {};
  const context = {};
  const modules = [];

  const app = (
    <DynamicImports report={moduleName => modules.push(moduleName)}>
      <HelmetProvider context={context}>
        <ApolloProvider client={res.locals.client}>
          <StaticRouter location={req.url} context={staticContext}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      </HelmetProvider>
    </DynamicImports>
  );

  res.locals.staticContext = staticContext;
  res.locals.app = app;
  res.locals.helmetContext = context;
  res.locals.modules = modules;

  next();
};
