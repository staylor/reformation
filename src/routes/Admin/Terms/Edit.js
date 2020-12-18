import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import TermForm from './Form';

function EditTerm() {
  const params = useParams();
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(
    gql`
      query TermEditQuery($id: ObjID) {
        term(id: $id) {
          ...TermForm_term
        }
      }
      ${TermForm.fragments.term}
    `,
    {
      variables: { id: params.id },
      fetchPolicy: 'cache-and-network',
    }
  );
  const [mutate] = useMutation(gql`
    mutation UpdateTermMutation($id: ObjID!, $input: UpdateTermInput!) {
      updateTerm(id: $id, input: $input) {
        ...TermForm_term
      }
    }
    ${TermForm.fragments.term}
  `);

  if (loading && !data) {
    return <Loading />;
  }

  const { term } = data;

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        id: term.id,
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
      <Heading>{`Edit ${term.taxonomy.name}`}</Heading>
      {message === 'updated' && <Message text={`${term.taxonomy.name} updated.`} />}
      <FormWrap>
        <TermForm term={term} buttonLabel={`Update ${term.taxonomy.name}`} onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default EditTerm;
