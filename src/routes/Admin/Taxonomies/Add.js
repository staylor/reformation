import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
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
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [mutate] = useMutation(taxMutation);

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        input: updates,
      },
    })
      .then(({ data: { createTaxonomy } }) => {
        history.push({
          pathname: `/taxonomy/${createTaxonomy.id}`,
        });
      })
      .catch(() => setMessage('error'));
  };

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
