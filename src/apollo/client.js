import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { relayStylePagination } from '@apollo/client/utilities';
import possibleTypes from './possibleTypes';
import { makeCacheAware } from './typePolicies';

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
          podcasts: makeCacheAware(relayStylePagination(['search', 'order']), 'admin'),
          posts: makeCacheAware(relayStylePagination(['year', 'status', 'search']), 'admin'),
          shows: makeCacheAware(
            relayStylePagination(['latest', 'taxonomy', 'term', 'date', 'search', 'order']),
            'admin'
          ),
          taxonomies: makeCacheAware(relayStylePagination(), 'admin'),
          terms: makeCacheAware(
            relayStylePagination(['taxonomyId', 'taxonomy', 'search']),
            'admin'
          ),
          uploads: makeCacheAware(relayStylePagination(['type', 'mimeType', 'search']), 'admin'),
          users: makeCacheAware(relayStylePagination(['search']), 'admin'),
          videos: makeCacheAware(relayStylePagination(['year', 'search']), 'admin'),
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
