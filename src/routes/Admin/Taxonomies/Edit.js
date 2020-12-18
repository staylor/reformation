import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import TaxonomyForm from './Form';

function EditTaxonomy() {
  const params = useParams();
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(
    gql`
      query TaxonomyEditQuery($id: ObjID) {
        taxonomy(id: $id) {
          ...TaxonomyForm_taxonomy
        }
      }
      ${TaxonomyForm.fragments.taxonomy}
    `,
    {
      variables: { id: params.id },
      fetchPolicy: 'cache-and-network',
    }
  );
  const [mutate] = useMutation(gql`
    mutation UpdateTaxonomyMutation($id: ObjID!, $input: UpdateTaxonomyInput!) {
      updateTaxonomy(id: $id, input: $input) {
        ...TaxonomyForm_taxonomy
      }
    }
    ${TaxonomyForm.fragments.taxonomy}
  `);

  if (loading && !data) {
    return <Loading />;
  }

  const { taxonomy } = data;

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
      <Heading>Edit Taxonomy</Heading>
      {message === 'updated' && <Message text="Taxonomy updated." />}
      <FormWrap>
        <TaxonomyForm taxonomy={taxonomy} buttonLabel="Update Taxonomy" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default EditTaxonomy;
