import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Message from 'components/Form/Message';
import Page from 'routes/Admin/Page';
import { FormWrap } from 'routes/Admin/styled';
import TaxonomyForm from './Form';

const taxQuery = gql`
  query TaxonomyEditQuery($id: ObjID) {
    taxonomy(id: $id) {
      ...TaxonomyForm_taxonomy
    }
  }
  ${TaxonomyForm.fragments.taxonomy}
`;

const taxMutation = gql`
  mutation UpdateTaxonomyMutation($id: ObjID!, $input: UpdateTaxonomyInput!) {
    updateTaxonomy(id: $id, input: $input) {
      ...TaxonomyForm_taxonomy
    }
  }
  ${TaxonomyForm.fragments.taxonomy}
`;

function EditTaxonomy() {
  const params = useParams();
  const [message, setMessage] = useState(null);
  const query = useQuery(taxQuery, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(taxMutation);

  return (
    <Page query={query} title="Edit Taxonomy">
      {({ taxonomy }) => {
        const onSubmit = (e, updates) => {
          e.preventDefault();

          mutate({
            variables: {
              id: taxonomy.id,
              input: updates,
            },
          })
            .then(() => {
              setMessage('updated');
              document.documentElement.scrollTop = 0;
            })
            .catch(() => setMessage('error'));
        };
        return (
          <>
            {message === 'updated' && <Message text="Taxonomy updated." />}
            <FormWrap>
              <TaxonomyForm taxonomy={taxonomy} buttonLabel="Update Taxonomy" onSubmit={onSubmit} />
            </FormWrap>
          </>
        );
      }}
    </Page>
  );
}

export default EditTaxonomy;
