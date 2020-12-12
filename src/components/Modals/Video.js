import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { gql, useQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import Loading from 'components/Loading';
import Video from 'components/Videos/Video';
import {
  modalClass,
  frameClass,
  itemTitleClass,
  itemImageClass,
  videoItemClass,
  CloseButton,
} from './styled';

/* eslint-disable react/prop-types */

function VideoModal({ selectVideo, onClose }) {
  const frameRef = useRef(null);
  const { loading, fetchMore, data } = useQuery(
    gql`
      query VideoModalQuery($cursor: String, $first: Int) {
        videos(after: $cursor, first: $first) {
          edges {
            node {
              id
              ...Video_video
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
      ${Video.fragments.video},
    `,
    {
      variables: {
        first: 50,
      },
    }
  );

  const scrollListener = debounce(() => {
    const { videos } = data;
    const hasNext = videos.pageInfo.hasNextPage;
    if (!hasNext || loading) {
      return;
    }
    if (
      frameRef.current.scrollTop + frameRef.current.offsetHeight >=
      frameRef.current.scrollHeight
    ) {
      fetchMore({
        variables: {
          cursor: videos.pageInfo.endCursor,
        },
      });
    }
  }, 500);

  useEffect(() => {
    const frame = frameRef.current;
    if (data) {
      frame.addEventListener('scroll', scrollListener);
    }

    return () => {
      if (data) {
        frame.removeEventListener('scroll', scrollListener);
      }
    };
  }, [data, scrollListener]);

  const portal = document.getElementById('portal');

  if (!loading && !data) {
    return null;
  }

  if (loading && !data) {
    return ReactDOM.createPortal(
      <div className={modalClass}>
        <Loading />
      </div>,
      portal
    );
  }

  const { videos } = data;

  return ReactDOM.createPortal(
    <div className={modalClass}>
      <CloseButton className="dashicons dashicons-no" onClick={onClose} />
      <div className={frameClass} ref={frameRef}>
        {videos.edges.map(({ node }) => {
          const crop = node.thumbnails.find(c => c.width === 120);
          return (
            <div // eslint-disable-line
              className={videoItemClass}
              key={node.id}
              onClick={e => {
                e.preventDefault();

                const normalized = {
                  dataId: node.dataId,
                  title: node.title,
                  slug: node.slug,
                  thumbnails: [],
                };
                node.thumbnails.forEach(({ width, height, url }) => {
                  normalized.thumbnails.push({ width, height, url });
                });

                selectVideo({
                  videoId: node.id,
                  video: normalized,
                });
                onClose(e);
              }}
            >
              <img className={itemImageClass} alt="" src={crop.url} />
              <span className={itemTitleClass}>{node.title}</span>
            </div>
          );
        })}
      </div>
    </div>,
    document.getElementById('portal')
  );
}

export default VideoModal;
