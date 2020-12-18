import React from 'react';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import { useSubmitNew } from 'routes/Admin/utils';
import PodcastForm from './Form';

const podcastMutation = gql`
  mutation CreatePodcastMutation($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      id
    }
  }
`;

function AddPodcast() {
  const { onSubmit, message } = useSubmitNew({
    mutation: podcastMutation,
    path: 'podcast',
    key: 'createPodcast',
  });

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
