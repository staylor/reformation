import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Video from 'components/Videos/Video';

const videoQuery = gql`
  query VideoQuery($slug: String) {
    video(slug: $slug) {
      ...Video_video
    }
  }
  ${Video.fragments.video}
`;

function VideoRoute() {
  const params = useParams();
  const { loading, data } = useQuery(videoQuery, {
    variables: { slug: params.slug },
  });

  if (loading && !data) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{data.video.title}</title>
      </Helmet>
      <Video single video={data.video} />
    </>
  );
}

export default VideoRoute;
