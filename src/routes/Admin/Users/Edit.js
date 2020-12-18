import React from 'react';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import Page from 'routes/Admin/Page';
import { FormWrap } from 'routes/Admin/styled';
import { useEditQuery, useSubmitEdit } from 'routes/Admin/utils';
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
  const query = useEditQuery(userQuery);
  const { onSubmit, message } = useSubmitEdit({ mutation: userMutation });

  return (
    <Page query={query} title="Edit User">
      {({ user }) => {
        return (
          <>
            {message === 'updated' && <Message text="User updated." />}
            <FormWrap>
              <UserForm user={user} buttonLabel="Update User" onSubmit={onSubmit(user)} />
            </FormWrap>
          </>
        );
      }}
    </Page>
  );
}

export default EditUser;
