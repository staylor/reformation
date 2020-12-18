import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { FormWrap } from 'routes/Admin/styled';
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
  const params = useParams();
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(postQuery, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(postMutation);

  if (loading && !data) {
    return <Loading />;
  }

  const { post } = data;

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        id: post.id,
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
      {message === 'updated' && <Message text="Post updated." />}
      <FormWrap>
        <PostForm post={post} buttonLabel="Update Post" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default EditPost;
