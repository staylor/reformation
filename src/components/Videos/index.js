import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import { LoadMore } from 'styles/utils';
import Video from './Video';

/* eslint-disable react/prop-types */

function Videos({ cacheKey }) {
  const params = useParams();
  const variables = { first: 10, cacheKey: cacheKey || 'videos' };
  if (params.year) {
    variables.year = parseInt(params.year, 10);
  }
  const { loading, fetchMore, data } = useQuery(
    gql`
      query VideosQuery($first: Int, $after: String, $year: Int, $cacheKey: String) {
        videos(first: $first, after: $after, year: $year) @cache(key: $cacheKey) {
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
    {
      variables,
    }
  );
  if (loading && !data) {
    return <Loading />;
  }

  const { videos } = data;

  const loadMore = e => {
    e.preventDefault();

    return fetchMore({
      variables: {
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
