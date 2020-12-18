import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import TermForm from './Form';

function AddTerm() {
  const params = useParams();
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(
    gql`
      query TermTaxonomyQuery($id: ObjID) {
        taxonomy(id: $id) {
          ...TermForm_taxonomy
        }
      }
      ${TermForm.fragments.taxonomy}
    `,
    {
      variables: { id: params.taxonomyId },
      fetchPolicy: 'cache-and-network',
    }
  );
  const [mutate] = useMutation(gql`
    mutation CreateTermMutation($input: CreateTermInput!) {
      createTerm(input: $input) {
        ...TermForm_term
      }
    }
    ${TermForm.fragments.term}
  `);

  if (loading && !data) {
    return <Loading />;
  }

  const { taxonomy } = data;

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        input: {
          ...updates,
          taxonomy: taxonomy.id,
        },
      },
    })
      .then(({ data: { createTerm } }) => {
        history.push({
          pathname: `/terms/${createTerm.taxonomy.id}/${createTerm.id}`,
        });
      })
      .catch(() => setMessage('error'));
  };

  return (
    <>
      <Heading>{`Add ${taxonomy.name}`}</Heading>
      {message === 'error' && <Message text={`Error adding ${taxonomy.name}.`} />}
      <FormWrap>
        <TermForm term={{ taxonomy }} buttonLabel={`Add ${taxonomy.name}`} onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default AddTerm;
