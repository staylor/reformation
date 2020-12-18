import React from 'react';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import { useSubmitNew } from 'routes/Admin/utils';
import UserForm from './Form';

const userMutation = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

function AddUser() {
  const { onSubmit, message } = useSubmitNew({
    mutation: userMutation,
    path: 'user',
    key: 'createUser',
  });

  return (
    <>
      <Heading>Add User</Heading>
      {message === 'error' && <Message text="Error adding user." />}
      <FormWrap>
        <UserForm buttonLabel="Add User" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default AddUser;
