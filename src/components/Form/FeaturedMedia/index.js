import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import MediaModal from 'components/Modals/Media';
import { Button } from 'styles/utils';
import { uploadUrl } from 'utils/media';
import { imageClass, audioClass } from './styled';

/* eslint-disable react/prop-types */

function FeaturedMedia({ media, type, onChange, buttonText }) {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const onClose = () => setModal(false);

  const onClick = e => {
    e.preventDefault();
    setModal(true);
  };

  const selectImage = data => {
    onChange([data.imageId]);
    setSelected([data.image]);
  };

  const selectAudio = data => {
    onChange([data.id]);
    setSelected([data]);
  };

  let featured = [];
  if (selected) {
    featured = selected;
  } else if (media) {
    featured = media;
  }

  return (
    <>
      {modal && (
        <MediaModal
          type={type}
          selectAudio={selectAudio}
          selectImage={selectImage}
          onClose={onClose}
        />
      )}
      {featured.filter(Boolean).map(item => {
        if (type === 'audio') {
          return (
            <figure key={item.id} className={audioClass}>
              <audio // eslint-disable-line
                controls
                src={uploadUrl(item.destination, item.fileName)}
              />
            </figure>
          );
        }

        const crop = item && item.crops && item.crops.find(c => c.width === 150);
        if (crop) {
          return (
            <img
              className={imageClass}
              key={crop.fileName}
              alt=""
              src={uploadUrl(item.destination, crop.fileName)}
            />
          );
        }

        return <p key={item.id}>{item.id}</p>;
      })}
      <Button onClick={onClick}>{buttonText}</Button>
    </>
  );
}

FeaturedMedia.fragments = {
  media: gql`
    fragment FeaturedMedia_media on MediaUpload {
      id
      type
      destination
      fileName
      ... on ImageUpload {
        crops {
          fileName
          width
        }
      }
    }
  `,
};

FeaturedMedia.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
};

FeaturedMedia.defaultProps = {
  type: undefined,
  buttonText: 'Set Featured Media',
};

export default FeaturedMedia;
