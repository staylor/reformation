import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import NotFound from 'components/NotFound';
import Loading from 'components/Loading';
import FeaturedMedia from 'components/FeaturedMedia';
import ShowsGrid from 'routes/App/Shows/Grid';
import { titleClass, textClass } from './styled';

/* eslint-disable react/prop-types */

@graphql(
  gql`
    query VenueQuery($slug: String!, $first: Int) {
      venue: term(slug: $slug, taxonomy: "venue") {
        id
        name
        featuredMedia {
          ...FeaturedMedia_featuredMedia
        }
        ... on Venue {
          capacity
          address
        }
      }
      shows(latest: true, term: $slug, taxonomy: "venue", first: $first) {
        ...ShowsGrid_shows
      }
    }
    ${FeaturedMedia.fragments.featuredMedia}
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
      return <Loading />;
    }

    if (error || !venue) {
      return <NotFound />;
    }

    return (
      <>
        <h1 className={titleClass}>{venue.name}</h1>
        <FeaturedMedia featuredMedia={venue.featuredMedia} />
        {venue.address && (
          <p
            className={textClass}
            dangerouslySetInnerHTML={{ __html: venue.address.replace(/\n/g, '<br />') }}
          />
        )}
        {venue.capacity && <p className={textClass}>Capacity: {venue.capacity}</p>}
        <ShowsGrid shows={shows} />
      </>
    );
  }
}

export default VenueRoute;
