import React from 'react';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import Page from 'routes/Admin/Page';
import { FormWrap } from 'routes/Admin/styled';
import { useEditQuery, useSubmitEdit } from 'routes/Admin/utils';
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
  const query = useEditQuery(taxQuery);
  const { onSubmit, message } = useSubmitEdit({ mutation: taxMutation });

  return (
    <Page query={query} title="Edit Taxonomy">
      {({ taxonomy }) => {
        return (
          <>
            {message === 'updated' && <Message text="Taxonomy updated." />}
            <FormWrap>
              <TaxonomyForm
                taxonomy={taxonomy}
                buttonLabel="Update Taxonomy"
                onSubmit={onSubmit(taxonomy)}
              />
            </FormWrap>
          </>
        );
      }}
    </Page>
  );
}

export default EditTaxonomy;
