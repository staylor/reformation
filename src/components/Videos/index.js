import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import { LoadMore } from 'styles/utils';
import Video from './Video';

/* eslint-disable react/prop-types */

function Videos() {
  const params = useParams();
  const vars = { first: 10 };
  if (params.year) {
    vars.year = parseInt(params.year, 10);
  }
  const { loading, fetchMore, variables, data } = useQuery(
    gql`
      query VideosQuery($first: Int, $after: String, $year: Int) {
        videos(first: $first, after: $after, year: $year)
          @connection(key: "videos", filter: ["year"]) {
          edges {
            node {
              id
              ...Video_video
            }
            cursor
          }
          pageInfo {
            hasNextPage
          }
        }
      }
      ${Video.fragments.video}
    `,
    { variables: vars }
  );
  if (loading && !data) {
    return <Loading />;
  }

  const { videos } = data;

  const loadMore = e => {
    e.preventDefault();

    return fetchMore({
      variables: {
        ...variables,
        after: videos.edges[videos.edges.length - 1].cursor,
      },
    });
  };

  return (
    <>
      {videos.edges.map(edge => (
        <Video key={edge.node.id} video={edge.node} />
      ))}
      {videos.pageInfo.hasNextPage && <LoadMore onClick={loadMore}>MORE</LoadMore>}
    </>
  );
}

export default Videos;
