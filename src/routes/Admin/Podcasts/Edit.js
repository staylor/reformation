import React from 'react';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import Page from 'routes/Admin/Page';
import { FormWrap } from 'routes/Admin/styled';
import { useEditQuery, useSubmitEdit } from 'routes/Admin/utils';
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
  const query = useEditQuery(podcastQuery);
  const { onSubmit, message } = useSubmitEdit(podcastMutation);

  return (
    <Page query={query} title="Edit Podcast">
      {({ podcast }) => {
        return (
          <>
            {message === 'updated' && <Message text="Podcast updated." />}
            <FormWrap>
              <PodcastForm
                podcast={podcast}
                buttonLabel="Update Podcast"
                onSubmit={onSubmit(podcast)}
              />
            </FormWrap>
          </>
        );
      }}
    </Page>
  );
}

export default EditPodcast;
