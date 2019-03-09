import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import Header from './Header';
import Shows from './Shows';
import Footer from './Footer';

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
});

function App({ data }) {
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header data={data} />
        <Shows data={data} />
        <Footer data={data} />
      </View>
    </SafeAreaView>
  );
}

const compose = graphql(
  gql`
    query AppQuery($first: Int!) {
      settings(id: "site") {
        ... on SiteSettings {
          siteTitle
          tagline
          siteUrl
          language
          copyrightText
        }
      }
      shows(latest: true, first: $first) @connection(key: "shows", filter: ["latest"]) {
        edges {
          node {
            id
            title
            artist {
              id
              name
            }
            venue {
              id
              name
            }
            date
          }
        }
      }
      socialSettings: settings(id: "social") {
        ... on SocialSettings {
          facebookUrl
          facebookAppId
          twitterUsername
          instagramUsername
        }
      }
    }
  `,
  {
    options: {
      variables: {
        first: 50,
      },
    },
  }
);

App.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default compose(App);
