import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Message from 'components/Form/Message';
import Page from 'routes/Admin/Page';
import { FormWrap } from 'routes/Admin/styled';
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
  const query = useQuery(userQuery, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(userMutation);

  return (
    <Page query={query} title="Edit User">
      {({ user }) => {
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
            {message === 'updated' && <Message text="User updated." />}
            <FormWrap>
              <UserForm user={user} buttonLabel="Update User" onSubmit={onSubmit} />
            </FormWrap>
          </>
        );
      }}
    </Page>
  );
}

export default EditUser;
