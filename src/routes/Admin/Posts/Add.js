import React from 'react';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import { FormWrap } from 'routes/Admin/styled';
import { useSubmitNew } from 'routes/Admin/utils';
import PostForm from './Form';

const postMutation = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostForm_post
    }
  }
  ${PostForm.fragments.post}
`;

function AddPost() {
  const { onSubmit, message } = useSubmitNew({
    mutation: postMutation,
    path: 'post',
    key: 'createPost',
  });

  return (
    <>
      {message && <Message text={message} />}
      <FormWrap>
        <PostForm post={{}} buttonLabel="Add Post" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default AddPost;
