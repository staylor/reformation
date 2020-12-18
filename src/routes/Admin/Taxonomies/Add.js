import React from 'react';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import { useSubmitNew } from 'routes/Admin/utils';
import TaxonomyForm from './Form';

const taxMutation = gql`
  mutation CreateTaxonomyMutation($input: CreateTaxonomyInput!) {
    createTaxonomy(input: $input) {
      ...TaxonomyForm_taxonomy
    }
  }
  ${TaxonomyForm.fragments.taxonomy}
`;

function AddTaxonomy() {
  const { onSubmit, message } = useSubmitNew({
    mutation: taxMutation,
    path: 'taxonomy',
    key: 'createTaxonomy',
  });

  return (
    <>
      <Heading>Add Taxonomy</Heading>
      {message === 'error' && <Message text="Error adding taxonomy." />}
      <FormWrap>
        <TaxonomyForm buttonLabel="Add Taxonomy" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default AddTaxonomy;
