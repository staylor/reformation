import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import UserForm from './Form';

const userQuery = gql`
  query UserEditQuery($id: ObjID!) {
    user(id: $id) {
      ...UserForm_user
    }
  }
  ${UserForm.fragments.user}
`;

const userMutation = gql`
  mutation UpdateUserMutation($id: ObjID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserForm_user
    }
  }
  ${UserForm.fragments.user}
`;

function EditUser() {
  const params = useParams();
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(userQuery, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(userMutation);

  if (loading && !data) {
    return <Loading />;
  }

  const { user } = data;

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        id: user.id,
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
      <Heading>Edit User</Heading>
      {message === 'updated' && <Message text="User updated." />}
      <FormWrap>
        <UserForm user={user} buttonLabel="Update User" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default EditUser;
