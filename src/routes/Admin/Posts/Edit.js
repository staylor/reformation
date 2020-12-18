import React from 'react';
import { gql } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { FormWrap } from 'routes/Admin/styled';
import { useEditQuery, useSubmitEdit } from 'routes/Admin/utils';
import PostForm from './Form';

const postQuery = gql`
  query PostEditQuery($id: ObjID!) {
    post(id: $id) {
      ...PostForm_post
    }
  }
  ${PostForm.fragments.post}
`;

const postMutation = gql`
  mutation UpdatePostMutation($id: ObjID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      ...PostForm_post
    }
  }
  ${PostForm.fragments.post}
`;

function EditPost() {
  const { loading, data } = useEditQuery(postQuery);
  const { onSubmit, message } = useSubmitEdit({ mutation: postMutation });

  if (loading && !data) {
    return <Loading />;
  }

  const { post } = data;

  return (
    <>
      {message === 'updated' && <Message text="Post updated." />}
      <FormWrap>
        <PostForm post={post} buttonLabel="Update Post" onSubmit={onSubmit(post)} />
      </FormWrap>
    </>
  );
}

export default EditPost;
