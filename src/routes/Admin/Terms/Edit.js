import React from 'react';
import { gql } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import { useEditQuery, useSubmitEdit } from 'routes/Admin/utils';
import TermForm from './Form';

const termQuery = gql`
  query TermEditQuery($id: ObjID) {
    term(id: $id) {
      ...TermForm_term
    }
  }
  ${TermForm.fragments.term}
`;

const termMutation = gql`
  mutation UpdateTermMutation($id: ObjID!, $input: UpdateTermInput!) {
    updateTerm(id: $id, input: $input) {
      ...TermForm_term
    }
  }
  ${TermForm.fragments.term}
`;

function EditTerm() {
  const { loading, data } = useEditQuery(termQuery);
  const { onSubmit, message } = useSubmitEdit({ mutation: termMutation });

  if (loading && !data) {
    return <Loading />;
  }

  const { term } = data;

  return (
    <>
      <Heading>{`Edit ${term.taxonomy.name}`}</Heading>
      {message === 'updated' && <Message text={`${term.taxonomy.name} updated.`} />}
      <FormWrap>
        <TermForm
          term={term}
          buttonLabel={`Update ${term.taxonomy.name}`}
          onSubmit={onSubmit(term)}
        />
      </FormWrap>
    </>
  );
}

export default EditTerm;
