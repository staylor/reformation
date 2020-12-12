import React from 'react';
import { gql } from '@apollo/client';
import Form from 'components/Form';
import FeaturedMedia from 'components/Form/FeaturedMedia';

/* eslint-disable react/prop-types,react/no-multi-comp */

const podcastFields = [
  { label: 'Title', prop: 'title', editable: true },
  { label: 'Description', prop: 'description', type: 'textarea', editable: true },
  podcast => {
    let featuredMedia = podcast.image && podcast.image.id;
    const onChange = value => {
      [featuredMedia] = value;
    };
    return {
      label: 'Image',
      prop: 'image',
      type: 'custom',
      editable: true,
      value: () => featuredMedia,
      render: p => (
        <FeaturedMedia
          type="image"
          buttonText="Set Image"
          onChange={onChange}
          media={p ? [p.image] : []}
        />
      ),
    };
  },
  podcast => {
    let featuredMedia = podcast.audio && podcast.audio.id;
    const onChange = value => {
      [featuredMedia] = value;
    };
    return {
      label: 'Audio',
      prop: 'audio',
      type: 'custom',
      editable: true,
      value: () => featuredMedia,
      render: p => (
        <FeaturedMedia
          type="audio"
          buttonText="Set Audio"
          onChange={onChange}
          media={p ? [p.audio] : []}
        />
      ),
    };
  },
];

export default function PodcastForm({ podcast = {}, buttonLabel = 'Submit', onSubmit }) {
  return (
    <Form fields={podcastFields} data={podcast} buttonLabel={buttonLabel} onSubmit={onSubmit} />
  );
}

PodcastForm.fragments = {
  podcast: gql`
    fragment PodcastForm_podcast on Podcast {
      id
      title
      description
      image {
        id
        ...FeaturedMedia_media
      }
      audio {
        id
        ...FeaturedMedia_media
      }
    }
    ${FeaturedMedia.fragments.media}
  `,
};
