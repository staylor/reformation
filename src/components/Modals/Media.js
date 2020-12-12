import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
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

/* eslint-disable react/prop-types */

@graphql(
  gql`
    query MediaModalQuery($type: String, $first: Int, $cursor: String) {
      uploads(after: $cursor, first: $first, type: $type) @connection(key: "media") {
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
  `,
  {
    options: ({ type }) => {
      const variables = { first: 25 };

      if (type) {
        variables.type = type;
      }

      return {
        variables,
        fetchPolicy: 'cache-and-network',
      };
    },
  }
)
class MediaModal extends Component {
  loadMore = () => {
    const { fetchMore, variables, uploads } = this.props.data;
    return fetchMore({
      variables: {
        ...variables,
        cursor: uploads.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { edges: previousEdges } = previousResult.uploads;
        const { edges: newEdges } = fetchMoreResult.uploads;
        const newUploads = {
          uploads: {
            ...fetchMoreResult.uploads,
            edges: [...previousEdges, ...newEdges],
          },
        };
        return newUploads;
      },
    });
  };

  frameHandler = frame => {
    if (!frame) {
      return;
    }
    frame.addEventListener('scroll', () => {
      const { uploads, loading } = this.props.data;
      const hasNext = uploads.pageInfo.hasNextPage;
      if (!hasNext || loading) {
        return;
      }
      if (frame.scrollTop + frame.offsetHeight >= frame.scrollHeight) {
        this.loadMore();
      }
    });
  };

  modalRef = null;

  render() {
    const {
      data: { loading, uploads },
    } = this.props;

    const portal = document.getElementById('portal');

    if (loading && !uploads) {
      return ReactDOM.createPortal(
        <div className={modalClass}>
          <Loading />
        </div>,
        portal
      );
    }

    return ReactDOM.createPortal(
      <div
        className={modalClass}
        innerRef={ref => {
          this.modalRef = ref;
        }}
        id="media-modal"
      >
        <CloseButton className="dashicons dashicons-no" onClick={this.props.onClose} />
        <div className={frameClass} innerRef={this.frameHandler}>
          {uploads.edges.map(({ node }) => {
            const prop = this.type === 'audio' ? 'images' : 'crops';
            const crop = node[prop] && node[prop].find(c => c.width === 150);
            return (
              <Item
                key={node.id}
                onClick={e => {
                  e.preventDefault();

                  if (node.type === 'audio') {
                    this.props.selectAudio(node);
                  } else {
                    const normalized = {
                      destination: node.destination,
                      crops: [],
                    };

                    node.crops.forEach(({ width, fileName }) => {
                      normalized.crops.push({ width, fileName });
                    });

                    this.props.selectImage({
                      imageId: node.id,
                      image: normalized,
                      size: 'FEATURE',
                    });
                  }

                  this.props.onClose(e);
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
}

export default MediaModal;
