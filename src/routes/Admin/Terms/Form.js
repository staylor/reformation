import React from 'react';
import gql from 'graphql-tag';
import Form from 'components/Form';
import FeaturedMedia from 'components/Form/FeaturedMedia';

/* eslint-disable react/prop-types */

const termFields = [
  { label: 'Name', prop: 'name', editable: true },
  { label: 'Slug', prop: 'slug', condition: term => term.slug },
  {
    label: 'Description',
    prop: 'description',
    type: 'textarea',
    editable: true,
  },
  {
    label: 'Capacity',
    prop: 'capacity',
    type: 'text',
    editable: true,
    condition: term => term.taxonomy.slug === 'venue',
  },
  {
    label: 'Address',
    prop: 'address',
    type: 'textarea',
    editable: true,
    condition: term => term.taxonomy.slug === 'venue',
  },
  term => {
    let featuredMedia = term.featuredMedia
      ? term.featuredMedia.filter(Boolean).map(media => media.id)
      : [];
    const onChange = value => {
      featuredMedia = value;
    };
    return {
      label: 'Featured Media',
      prop: 'featuredMedia',
      type: 'custom',
      editable: true,
      value: () => featuredMedia,
      render: p => <FeaturedMedia onChange={onChange} media={p.featuredMedia} />,
      position: 'meta',
      condition: t => ['artist', 'venue'].includes(t.taxonomy.slug),
    };
  },
];

export default function TermForm({ term = {}, buttonLabel, onSubmit }) {
  return <Form fields={termFields} data={term} buttonLabel={buttonLabel} onSubmit={onSubmit} />;
}

TermForm.fragments = {
  term: gql`
    fragment TermForm_term on Term {
      id
      name
      slug
      description
      taxonomy {
        id
        name
        slug
        plural
      }
      featuredMedia {
        ...FeaturedMedia_media
      }
      ... on Venue {
        capacity
        address
      }
    }
    ${FeaturedMedia.fragments.media}
  `,
  taxonomy: gql`
    fragment TermForm_taxonomy on Taxonomy {
      id
      name
      slug
      plural
    }
  `,
};
