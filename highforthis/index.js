import React from 'react';
import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { name as appName } from './app';
import App from './components/App';

const fragmentMatcher = require('./fragmentMatcher');

const client = new ApolloClient({
  uri: 'https://graphql.highforthis.com/graphql',
  cache: new InMemoryCache({ fragmentMatcher }),
});

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const AppWithProviders = codePush(codePushOptions)(() => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
));

AppRegistry.registerComponent(appName, () => AppWithProviders);
