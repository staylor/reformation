import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import Video from 'components/Videos/Video';

/* eslint-disable react/prop-types */

@graphql(
  gql`
    query VideoQuery($slug: String) {
      video(slug: $slug) {
        ...Video_video
      }
    }
    ${Video.fragments.video}
  `,
  {
    options: ({ match: { params } }) => ({
      variables: { slug: params.slug },
    }),
  }
)
class VideoRoute extends Component {
  render() {
    const {
      data: { loading, video },
    } = this.props;

    if (loading && !video) {
      return null;
    }

    return (
      <>
        <Helmet>
          <title>{video.title}</title>
        </Helmet>
        <Video single video={video} />
      </>
    );
  }
}

export default VideoRoute;
