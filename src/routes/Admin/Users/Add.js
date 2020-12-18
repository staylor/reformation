import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import UserForm from './Form';

function AddUser() {
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [mutate] = useMutation(gql`
    mutation CreateUserMutation($input: CreateUserInput!) {
      createUser(input: $input) {
        id
      }
    }
  `);

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        input: updates,
      },
    })
      .then(({ data: { createUser } }) => {
        history.push({
          pathname: `/user/${createUser.id}`,
        });
      })
      .catch(() => setMessage('error'));
  };

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
