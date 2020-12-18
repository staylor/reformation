import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import PodcastForm from './Form';

function AddPodcast() {
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [mutate] = useMutation(gql`
    mutation CreatePodcastMutation($input: CreatePodcastInput!) {
      createPodcast(input: $input) {
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
      .then(({ data: { createPodcast } }) => {
        history.push({
          pathname: `/podcast/${createPodcast.id}`,
        });
      })
      .catch(() => setMessage('error'));
  };

  return (
    <>
      <Heading>Add Podcast</Heading>
      {message === 'error' && <Message text="Error adding podcast." />}
      <FormWrap>
        <PodcastForm buttonLabel="Add Podcast" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default AddPodcast;
