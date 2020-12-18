import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import NotFound from 'components/NotFound';
import Loading from 'components/Loading';
import FeaturedMedia from 'components/FeaturedMedia';
import ShowsGrid from 'routes/App/Shows/Grid';
import { titleClass, textClass } from './styled';

const venueQuery = gql`
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
`;

function VenueRoute() {
  const params = useParams();
  const { error, loading, data } = useQuery(venueQuery, {
    variables: { first: 100, slug: params.slug },
  });

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <NotFound />;
  }

  const { venue, shows } = data;

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

export default VenueRoute;
