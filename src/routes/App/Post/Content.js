import React from 'react';
import { gql } from '@apollo/client';
import redraft from 'redraft';
import Video from 'components/Videos/Video';
import renderers from './renderers';

/* eslint-disable react/prop-types */

export default function Content({ contentState }) {
  return (
    <>
      {redraft(contentState, renderers, {
        cleanup: { after: 'all', types: 'all', trim: true },
      })}
    </>
  );
}

Content.fragments = {
  contentState: gql`
    fragment Content_contentState on ContentState {
      blocks {
        key
        text
        type
        depth
        inlineStyleRanges {
          offset
          length
          style
        }
        entityRanges {
          offset
          length
          key
        }
      }
      entityMap {
        type
        mutability
        data {
          ... on LinkData {
            href
            target
          }
          ... on EmbedData {
            url
            html
          }
          ... on ImageData {
            imageId
            image {
              destination
              crops {
                width
                fileName
              }
            }
            size
          }
          ... on VideoData {
            videoId
            video {
              ...Video_video
            }
          }
        }
      }
    }
    ${Video.fragments.video}
  `,
};
