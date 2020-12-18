import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { gql, useQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import Loading from 'components/Loading';
import { uploadUrl } from 'utils/media';
import {
  modalClass,
  frameClass,
  Item,
  itemImageClass,
  itemTitleClass,
  CloseButton,
} from './styled';

const uploadsQuery = gql`
  query MediaModalQuery($type: String, $first: Int, $cursor: String) {
    uploads(after: $cursor, first: $first, type: $type) @cache(key: "modal") {
      edges {
        node {
          id
          title
          type
          destination
          fileName
          ... on ImageUpload {
            crops {
              width
              fileName
            }
          }
          ... on AudioUpload {
            images {
              width
              fileName
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

function MediaModal({ type, onClose, selectAudio, selectImage }) {
  const frameRef = useRef(null);
  const { loading, fetchMore, data } = useQuery(uploadsQuery, {
    variables: { first: 50, type },
    fetchPolicy: 'cache-and-network',
  });

  const scrollListener = debounce(() => {
    const { uploads } = data;
    const hasNext = uploads.pageInfo.hasNextPage;
    if (!hasNext || loading) {
      return;
    }
    if (
      frameRef.current.scrollTop + frameRef.current.offsetHeight >=
      frameRef.current.scrollHeight
    ) {
      fetchMore({
        variables: {
          cursor: uploads.pageInfo.endCursor,
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

  const { uploads } = data;

  return ReactDOM.createPortal(
    <div className={modalClass} id="media-modal">
      <CloseButton className="dashicons dashicons-no" onClick={onClose} />
      <div className={frameClass} ref={frameRef}>
        {uploads.edges.map(({ node }) => {
          const prop = type === 'audio' ? 'images' : 'crops';
          const crop = node[prop] && node[prop].find(c => c.width === 150);
          return (
            <Item
              key={node.id}
              onClick={e => {
                e.preventDefault();

                if (node.type === 'audio') {
                  selectAudio(node);
                } else {
                  const normalized = {
                    destination: node.destination,
                    crops: [],
                  };

                  node.crops.forEach(({ width, fileName }) => {
                    normalized.crops.push({ width, fileName });
                  });

                  selectImage({
                    imageId: node.id,
                    image: normalized,
                    size: 'FEATURE',
                  });
                }

                onClose(e);
              }}
            >
              {crop ? (
                <img
                  className={itemImageClass}
                  alt=""
                  src={uploadUrl(node.destination, crop.fileName)}
                />
              ) : null}
              <span className={itemTitleClass}>{node.title}</span>
            </Item>
          );
        })}
      </div>
    </div>,
    portal
  );
}

export default MediaModal;
