import path from 'path';
import express from 'express';
import passport from 'passport';
import { createProxyMiddleware } from 'http-proxy-middleware';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { preloadDynamicImports } from 'kyt-runtime/server';
import authenticate from './authenticate';
import router from './router';

/* eslint-disable no-console */

process.env.TZ = 'America/New_York';

function startServer() {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('combined'));

  const publicDir = path.join(process.cwd(), KYT.PUBLIC_DIR);
  app.use(express.static(publicDir));

  app.use(cookieParser());

  // use a local GQL server by default
  const gqlHost = process.env.GQL_HOST || 'http://localhost:8080';

  const proxy = createProxyMiddleware({
    target: gqlHost,
    changeOrigin: true,
  });

  // proxy to the graphql server
  app.use('/graphql', proxy);
  app.use('/auth', proxy);
  app.use('/upload', proxy);
  app.use('/uploads', proxy);

  authenticate(app);
  router(app, passport);

  app.listen(parseInt(KYT.SERVER_PORT, 10));
}

preloadDynamicImports()
  .then(startServer)
  .catch(e => {
    console.error('Uncaught error in startup');
    console.error(e);
    console.trace(e);
  });
