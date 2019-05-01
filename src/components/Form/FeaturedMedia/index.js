import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import MediaModal from 'components/Modals/Media';
import { Button } from 'styles/utils';
import { uploadUrl } from 'utils/media';
import { imageClass, audioClass } from './styled';

/* eslint-disable react/prop-types */

export default class FeaturedMedia extends Component {
  static propTypes = {
    type: PropTypes.string,
    buttonText: PropTypes.string,
  };

  static defaultProps = {
    type: undefined,
    buttonText: 'Set Featured Media',
  };

  state = {
    modal: false,
    media: null,
  };

  onClose = () => this.setState({ modal: false });

  onClick = e => {
    e.preventDefault();
    this.setState({ modal: true });
  };

  selectImage = data => {
    this.props.onChange([data.imageId]);
    this.setState({ media: [data.image] });
  };

  selectAudio = data => {
    this.props.onChange([data.id]);
    this.setState({ media: [data] });
  };

  render() {
    let media = [];
    if (this.state.media) {
      ({ media } = this.state);
    } else if (this.props.media) {
      ({ media } = this.props);
    }

    return (
      <>
        {this.state.modal && (
          <MediaModal
            type={this.props.type}
            selectAudio={this.selectAudio}
            selectImage={this.selectImage}
            onClose={this.onClose}
          />
        )}
        {media.filter(Boolean).map(item => {
          if (this.props.type === 'audio') {
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
        <Button onClick={this.onClick}>{this.props.buttonText}</Button>
      </>
    );
  }
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
