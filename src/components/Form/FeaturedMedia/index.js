import React, { Component } from 'react';
import gql from 'graphql-tag';
import ImageModal from 'components/Modals/Image';
import { Button } from 'styles/utils';
import { uploadUrl } from 'utils/media';
import { FeaturedImage } from './styled';

/* eslint-disable react/prop-types */

export default class FeaturedMedia extends Component {
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

  render() {
    let media = [];
    if (this.state.media) {
      ({ media } = this.state);
    } else if (this.props.media) {
      ({ media } = this.props);
    }

    return (
      <>
        {this.state.modal && <ImageModal selectImage={this.selectImage} onClose={this.onClose} />}
        {media.filter(Boolean).map(item => {
          const crop = item.crops.find(c => c.width === 150);
          return (
            <FeaturedImage
              key={crop.fileName}
              alt=""
              src={uploadUrl(item.destination, crop.fileName)}
            />
          );
        })}
        <Button onClick={this.onClick}>Set Featured Media</Button>
      </>
    );
  }
}

FeaturedMedia.fragments = {
  media: gql`
    fragment FeaturedMedia_media on MediaUpload {
      id
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
