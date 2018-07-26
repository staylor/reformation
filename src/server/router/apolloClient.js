// @flow
import client from 'apollo/client';

export default (req, res, next) => {
  const port = parseInt(KYT.SERVER_PORT, 10);
  const uri = `http://localhost:${port}/graphql`;

  res.locals.client = client({ uri, authToken: req.cookies.draftAuthToken, ssrMode: true });

  next();
};
