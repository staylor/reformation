import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Message from 'components/Form/Message';
import Page from 'routes/Admin/Page';
import { FormWrap } from 'routes/Admin/styled';
import PodcastForm from './Form';

const podcastQuery = gql`
  query PodcastEditQuery($id: ObjID!) {
    podcast(id: $id) {
      ...PodcastForm_podcast
    }
  }
  ${PodcastForm.fragments.podcast}
`;

const podcastMutation = gql`
  mutation UpdatePodcastMutation($id: ObjID!, $input: UpdatePodcastInput!) {
    updatePodcast(id: $id, input: $input) {
      ...PodcastForm_podcast
    }
  }
  ${PodcastForm.fragments.podcast}
`;

function EditPodcast() {
  const params = useParams();
  const [message, setMessage] = useState(null);
  const query = useQuery(podcastQuery, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(podcastMutation);

  return (
    <Page query={query} title="Edit Podcast">
      {({ podcast }) => {
        const onSubmit = (e, updates) => {
          e.preventDefault();

          mutate({
            variables: {
              id: podcast.id,
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
            {message === 'updated' && <Message text="Podcast updated." />}
            <FormWrap>
              <PodcastForm podcast={podcast} buttonLabel="Update Podcast" onSubmit={onSubmit} />
            </FormWrap>
          </>
        );
      }}
    </Page>
  );
}

export default EditPodcast;
