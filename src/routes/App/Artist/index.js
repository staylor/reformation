import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import NotFound from 'components/NotFound';
import Loading from 'components/Loading';
import FeaturedMedia from 'components/FeaturedMedia';
import ShowsGrid from 'routes/App/Shows/Grid';

import { titleClass } from './styled';

function ArtistRoute() {
  const params = useParams();
  const { loading, error, data } = useQuery(
    gql`
      query ArtistQuery($slug: String!, $first: Int) {
        artist: term(slug: $slug, taxonomy: "artist") {
          id
          name
          featuredMedia {
            ...FeaturedMedia_featuredMedia
          }
        }
        shows(latest: true, term: $slug, taxonomy: "artist", first: $first) {
          ...ShowsGrid_shows
        }
      }
      ${FeaturedMedia.fragments.featuredMedia}
      ${ShowsGrid.fragments.shows}
    `,
    {
      variables: { first: 100, slug: params.slug },
    }
  );

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <NotFound />;
  }

  const { artist, shows } = data;

  return (
    <>
      <h1 className={titleClass}>{artist.name}</h1>
      <FeaturedMedia featuredMedia={artist.featuredMedia} />
      <ShowsGrid shows={shows} />
    </>
  );
}

export default ArtistRoute;
