import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { HelmetProvider } from 'react-helmet-async';
import { DynamicImports } from 'kyt-runtime/server';
import Admin from 'routes/Admin';
import dashiconsCSS from 'public/css/dashicons.min.css';
import draftCSS from 'public/css/Draft.css';

export default (req, res, next) => {
  const staticContext = {};
  const context = {};
  const modules = [];

  const app = (
    <DynamicImports report={moduleName => modules.push(moduleName)}>
      <HelmetProvider context={context}>
        <ApolloProvider client={res.locals.client}>
          <StaticRouter location={req.url} context={staticContext} basename="/admin">
            <Admin />
          </StaticRouter>
        </ApolloProvider>
      </HelmetProvider>
    </DynamicImports>
  );

  res.locals.staticContext = staticContext;
  res.locals.app = app;
  res.locals.helmetContext = context;
  res.locals.stylesheets = [dashiconsCSS, draftCSS];
  res.locals.modules = modules;

  next();
};
