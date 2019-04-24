import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import NotFound from 'components/NotFound';
import Loading from 'components/Loading';
import FeaturedMedia from 'components/FeaturedMedia';
import ShowsGrid from 'routes/App/Shows/Grid';

import { titleClass } from './styled';

/* eslint-disable react/prop-types */

@graphql(
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
    options: ({ match: { params } }) => ({
      variables: { first: 100, slug: params.slug },
    }),
  }
)
class ArtistRoute extends Component {
  render() {
    const {
      data: { loading, error, artist, shows },
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error || !artist) {
      return <NotFound />;
    }

    return (
      <>
        <h1 className={titleClass}>{artist.name}</h1>
        <FeaturedMedia featuredMedia={artist.featuredMedia} />
        <ShowsGrid shows={shows} />
      </>
    );
  }
}

export default ArtistRoute;
