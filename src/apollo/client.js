import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { relayStylePagination } from '@apollo/client/utilities';
import possibleTypes from './possibleTypes.json';

// type ClientOps = {
//   uri: string,
//   authToken?: string,
//   ssrMode?: boolean,
// };

export default function client({ uri, authToken = null, ssrMode = false }) {
  const headers = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  let cache = new InMemoryCache({
    possibleTypes,
    typePolicies: {
      Query: {
        fields: {
          podcasts: relayStylePagination(),
          posts: relayStylePagination(),
          shows: relayStylePagination(),
          taxonomies: relayStylePagination(),
          terms: relayStylePagination(),
          uploads: relayStylePagination(),
          users: relayStylePagination(),
          videos: relayStylePagination(),
        },
      },
    },
  });
  if (!ssrMode) {
    cache = cache.restore(window.__APOLLO_STATE__);
  }

  return new ApolloClient({
    uri,
    headers,
    cache,
    ssrMode,
  });
}
