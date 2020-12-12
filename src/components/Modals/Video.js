import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
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

@graphql(
  gql`
    query VideoModalQuery($cursor: String, $first: Int) {
      videos(after: $cursor, first: $first) @connection(key: "videos") {
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
    ${Video.fragments.video}
  `,
  {
    options: {
      variables: { first: 50 },
    },
  }
)
class VideoModal extends Component {
  loadMore = () => {
    const { fetchMore, variables, videos } = this.props.data;
    return fetchMore({
      variables: {
        ...variables,
        first: 25,
        cursor: videos.pageInfo.endCursor,
      },
    });
  };

  frameHandler = frame => {
    if (!frame) {
      return;
    }
    frame.addEventListener('scroll', () => {
      const hasNext = this.props.data.videos.pageInfo.hasNextPage;
      if (!hasNext || this.props.data.loading) {
        return;
      }
      if (frame.scrollTop + frame.offsetHeight >= frame.scrollHeight) {
        this.loadMore();
      }
    });
  };

  render() {
    const {
      data: { loading, videos },
    } = this.props;

    const portal = document.getElementById('portal');

    if (loading && !videos) {
      return ReactDOM.createPortal(
        <div className={modalClass}>
          <Loading />
        </div>,
        portal
      );
    }

    return ReactDOM.createPortal(
      <div className={modalClass}>
        <CloseButton className="dashicons dashicons-no" onClick={this.props.onClose} />
        <div className={frameClass} ref={this.frameHandler}>
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

                  this.props.selectVideo({
                    videoId: node.id,
                    video: normalized,
                  });
                  this.props.onClose(e);
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
}

export default VideoModal;
