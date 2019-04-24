import React from 'react';
import gql from 'graphql-tag';
import { css } from 'emotion';
import { uploadUrl } from 'utils/media';

/* eslint-disable react/prop-types */

const imageClass = css`
  display: block;
  height: auto;
  margin: 0 0 15px;
  max-width: 100%;
`;

function FeaturedMedia({ featuredMedia, cropSize = 640, className = imageClass }) {
  if (!featuredMedia) {
    return null;
  }

  return (
    <>
      {featuredMedia.filter(Boolean).map(media => {
        const crop = media.crops.find(c => c.width === cropSize);
        return (
          <img
            key={crop.fileName}
            className={className}
            alt=""
            src={uploadUrl(media.destination, crop.fileName)}
          />
        );
      })}
    </>
  );
}

FeaturedMedia.fragments = {
  featuredMedia: gql`
    fragment FeaturedMedia_featuredMedia on MediaUpload {
      destination
      ... on ImageUpload {
        crops {
          fileName
          width
        }
      }
    }
  `,
};

export default FeaturedMedia;
