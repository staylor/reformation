import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { ThumbWrapper, thumb480Class } from 'components/Videos/styled';
import Form from 'components/Form';
import { Heading, FormWrap } from 'routes/Admin/styled';

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

function EditVideo() {
  const params = useParams();
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(
    gql`
      query VideoEditQuery($id: ObjID) {
        video(id: $id) {
          ...AdminVideo_video
        }
      }
      ${frag}
    `,
    {
      variables: { id: params.id },
      fetchPolicy: 'cache-and-network',
    }
  );
  const [mutate] = useMutation(gql`
    mutation UpdateVideoMutation($id: ObjID!, $input: UpdateVideoInput!) {
      updateVideo(id: $id, input: $input) {
        ...AdminVideo_video
      }
    }
    ${frag}
  `);

  if (loading && !data) {
    return <Loading />;
  }

  const { video } = data;

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        id: video.id,
        input: updates,
      },
    })
      .then(() => {
        setMessage('updated');
        document.documentElement.scrollTop = 0;
      })
      .catch(() => setMessage('error'));
  };

  const thumb = video.thumbnails.find(t => t.width === 480);

  return (
    <>
      <Heading>Edit Video</Heading>
      {message === 'updated' && <Message text="Video updated." />}
      <ThumbWrapper>
        <img src={thumb.url} alt={video.title} className={thumb480Class} />
      </ThumbWrapper>
      <FormWrap>
        <Form fields={videoFields} data={video} buttonLabel="Update Video" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default EditVideo;
