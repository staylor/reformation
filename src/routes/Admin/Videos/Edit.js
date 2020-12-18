import React from 'react';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import { ThumbWrapper, thumb480Class } from 'components/Videos/styled';
import Form from 'components/Form';
import Page from 'routes/Admin/Page';
import { useEditQuery, useSubmitEdit } from 'routes/Admin/utils';
import { FormWrap } from 'routes/Admin/styled';

/* eslint-disable react/no-multi-comp */

const videoFields = [
  { label: 'Title', prop: 'title' },
  { label: 'Slug', prop: 'slug' },
  { label: 'Type', prop: 'dataType' },
  {
    label: 'Playlist',
    prop: 'dataPlaylistIds',
    render: video => (
      <a href={`https://www.youtube.com/playlist?list=${video.dataPlaylistIds[0]}`}>
        View {video.year} Playlist
      </a>
    ),
  },
];

const frag = gql`
  fragment AdminVideo_video on Video {
    id
    title
    slug
    dataType
    thumbnails {
      url
      width
      height
    }
    year
    dataPlaylistIds
  }
`;

const videoQuery = gql`
  query VideoEditQuery($id: ObjID) {
    video(id: $id) {
      ...AdminVideo_video
    }
  }
  ${frag}
`;

const videoMutation = gql`
  mutation UpdateVideoMutation($id: ObjID!, $input: UpdateVideoInput!) {
    updateVideo(id: $id, input: $input) {
      ...AdminVideo_video
    }
  }
  ${frag}
`;

function EditVideo() {
  const query = useEditQuery(videoQuery);
  const { onSubmit, message } = useSubmitEdit({ mutation: videoMutation });

  return (
    <Page query={query} title="Edit Video">
      {({ video }) => {
        const thumb = video.thumbnails.find(t => t.width === 480);

        return (
          <>
            {message === 'updated' && <Message text="Video updated." />}
            <ThumbWrapper>
              <img src={thumb.url} alt={video.title} className={thumb480Class} />
            </ThumbWrapper>
            <FormWrap>
              <Form
                fields={videoFields}
                data={video}
                buttonLabel="Update Video"
                onSubmit={onSubmit(video)}
              />
            </FormWrap>
          </>
        );
      }}
    </Page>
  );
}

export default EditVideo;
