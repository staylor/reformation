import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Message from 'components/Form/Message';
import { FormWrap } from 'routes/Admin/styled';
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
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [mutate] = useMutation(postMutation);

  const onSubmit = (e, updates) => {
    e.preventDefault();

    const input = { ...updates };

    mutate({
      variables: {
        input,
      },
    })
      .then(({ data: { createPost } }) => {
        history.push({
          pathname: `/post/${createPost.id}`,
        });
      })
      .catch(err => setMessage(err.message));
  };

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
