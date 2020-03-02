import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import MediaModal from 'components/Modals/Media';
import { Button } from 'styles/utils';
import { uploadUrl } from 'utils/media';
import { imageClass, audioClass } from './styled';

/* eslint-disable react/prop-types */

const reducer = (state, action) => ({ ...state, ...action });

function FeaturedMedia({ type, onChange, media: mediaProp, buttonText }) {
  const [state, setState] = useReducer(reducer, {
    modal: false,
    media: mediaProp || [],
  });

  const onClose = () => setState({ modal: false });

  const onClickEvent = e => {
    e.preventDefault();
    setState({ modal: true });
  };

  const selectImage = data => {
    onChange([data.imageId]);
    setState({ media: [data.image] });
  };

  const selectAudio = data => {
    onChange([data.id]);
    setState({ media: [data] });
  };

  return (
    <>
      {state.modal && (
        <MediaModal
          type={type}
          selectAudio={selectAudio}
          selectImage={selectImage}
          onClose={onClose}
        />
      )}
      {state.media.filter(Boolean).map(item => {
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
      <Button onClick={onClickEvent}>{buttonText}</Button>
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
