import React from 'react';
import gql from 'graphql-tag';
import Form from 'components/Form';

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
      ... on Venue {
        capacity
        address
      }
    }
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
