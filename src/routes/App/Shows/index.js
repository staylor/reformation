import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from 'components/Loading';
import ShowsList from 'routes/App/Shows/List';
import ShowsGrid from 'routes/App/Shows/Grid';

/* eslint-disable react/prop-types */

@graphql(
  gql`
    query ShowsQuery($first: Int, $after: String, $taxonomy: String, $term: String) {
      shows(latest: true, first: $first, after: $after, taxonomy: $taxonomy, term: $term)
      @connection(key: "shows", filter: ["taxonomy", "term"]) {
        ...ShowsGrid_shows
      }
    }
    ${ShowsGrid.fragments.shows}
  `,
  {
    options: ({ match: { params } }) => {
      const variables = { first: 100 };
      if (params.taxonomy && params.term) {
        variables.taxonomy = params.taxonomy;
        variables.term = params.term;
      }
      return { variables };
    },
  }
)
class Shows extends Component {
  render() {
    const {
      location: { pathname },
      data: { loading, shows },
    } = this.props;

    if (loading && !shows) {
      return <Loading />;
    }

    if (pathname === '/shows/list') {
      return <ShowsList shows={shows} />;
    }

    return <ShowsGrid shows={shows} />;
  }
}

export default Shows;
