import fetch from 'node-fetch';
import appRouter from './app';
import adminRouter from './admin';
import loginRouter from './login';
import apolloClient from './apolloClient';
import serveResponse from './serve';

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require

const assetMiddleware = entry => (req, res, next) => {
  res.locals.clientAssets = clientAssets;
  res.locals.runtimeJSBundle = clientAssets[`runtime~${entry}.js`];
  res.locals.mainJSBundle = clientAssets[`${entry}.js`];
  next();
};

export default function router(app, passport) {
  app.use('/oembed', async (req, res) => {
    const response = await fetch(
      `${req.query.provider}?url=${encodeURIComponent(req.query.url)}`
    ).then(result => result.json());

    res.json(response);
  });

  app.use(
    '/admin',
    passport.authenticate('jwt', {
      session: false,
      failureRedirect: '/login/unauthorized',
    }),
    assetMiddleware('admin'),
    apolloClient,
    adminRouter,
    serveResponse
  );

  app.use('/login', assetMiddleware('login'), apolloClient, loginRouter, serveResponse);
  app.use(assetMiddleware('main'), apolloClient, appRouter, serveResponse);
}
