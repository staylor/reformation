import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import PodcastForm from './Form';

function EditPodcast() {
  const params = useParams();
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(
    gql`
      query PodcastEditQuery($id: ObjID!) {
        podcast(id: $id) {
          ...PodcastForm_podcast
        }
      }
      ${PodcastForm.fragments.podcast}
    `,
    {
      variables: { id: params.id },
      fetchPolicy: 'cache-and-network',
    }
  );
  const [mutate] = useMutation(gql`
    mutation UpdatePodcastMutation($id: ObjID!, $input: UpdatePodcastInput!) {
      updatePodcast(id: $id, input: $input) {
        ...PodcastForm_podcast
      }
    }
    ${PodcastForm.fragments.podcast}
  `);

  if (loading && !data) {
    return <Loading />;
  }

  const { podcast } = data;

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
      <Heading>Edit Podcast</Heading>
      {message === 'updated' && <Message text="Podcast updated." />}
      <FormWrap>
        <PodcastForm podcast={podcast} buttonLabel="Update Podcast" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default EditPodcast;
