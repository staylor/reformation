import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import NotFound from 'components/NotFound';
import ShowsGrid from 'routes/App/Shows/Grid';
import { Title } from './styled';

/* eslint-disable react/prop-types */

@graphql(
  gql`
    query VenueQuery($slug: String!, $first: Int) {
      venue: term(slug: $slug, taxonomy: "venue") {
        id
        name
        ... on Venue {
          capacity
          address
        }
      }
      shows(latest: true, term: $slug, taxonomy: "venue", first: $first) {
        ...ShowsGrid_shows
      }
    }
    ${ShowsGrid.fragments.shows}
  `,
  {
    options: ({ match: { params } }) => ({
      variables: { first: 100, slug: params.slug },
    }),
  }
)
class VenueRoute extends Component {
  render() {
    const {
      data: { loading, error, venue, shows },
    } = this.props;

    if (loading) {
      return null;
    }

    if (error) {
      return <NotFound />;
    }

    return (
      <>
        <Title>{venue.name}</Title>
        {venue.capacity && <p>Capacity: {venue.capacity}</p>}
        {venue.address && (
          <p dangerouslySetInnerHTML={{ __html: venue.address.replace(/\n/g, '<br />') }} />
        )}
        <ShowsGrid shows={shows} />
      </>
    );
  }
}

export default VenueRoute;
