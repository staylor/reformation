import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import Form from 'components/Form';
import { Heading, titleInputClass, FormWrap } from 'routes/Admin/styled';
import { uploadUrl } from 'utils/media';
import MediaAdminQuery from './MediaAdminQuery.graphql';
import UpdateMediaMutation from './UpdateMediaMutation.graphql';
import ImageInfo from './ImageInfo';
import AudioInfo from './AudioInfo';
import VideoInfo from './VideoInfo';
import { audioClass, videoClass, croppedClass } from './styled';

/* eslint-disable react/no-multi-comp,jsx-a11y/media-has-caption */

const mediaFields = [
  {
    prop: 'title',
    editable: true,
    className: titleInputClass,
    placeholder: 'Enter a title',
  },
  {
    render: media => {
      let mediaInfo = null;
      if (media.type === 'image') {
        let src;
        const imageCrop = media.crops.find(c => c.width === 300);
        if (imageCrop) {
          src = uploadUrl(media.destination, imageCrop.fileName);
        } else {
          src = uploadUrl(media.destination, media.fileName);
        }
        mediaInfo = <img className={croppedClass} src={src} alt="" />;
      } else if (media.type === 'audio') {
        mediaInfo = (
          <audio
            className={audioClass}
            controls
            src={uploadUrl(media.destination, media.fileName)}
          />
        );
      } else if (media.type === 'video') {
        mediaInfo = (
          <video
            className={videoClass}
            preload="metadata"
            width={media.width}
            height={media.height}
            controls
            src={uploadUrl(media.destination, media.fileName)}
          />
        );
      }
      return (
        <>
          <strong>Original name:</strong> {media.originalName}
          {mediaInfo}
        </>
      );
    },
  },
  {
    label: 'Description',
    prop: 'description',
    type: 'textarea',
    editable: true,
    condition: media => media.type !== 'image',
  },
  {
    label: 'Caption',
    prop: 'caption',
    type: 'textarea',
    editable: true,
    condition: media => media.type === 'image',
  },
  {
    label: 'Alternative Text',
    prop: 'altText',
    editable: true,
    condition: media => media.type === 'image',
  },
  {
    type: 'custom',
    render: media => {
      if (media.type === 'audio') {
        return <AudioInfo media={media} />;
      }
      if (media.type === 'video') {
        return <VideoInfo media={media} />;
      }
      if (media.type === 'image') {
        return <ImageInfo media={media} />;
      }
      return null;
    },
    position: 'info',
  },
];

function EditMedia() {
  const params = useParams();
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(MediaAdminQuery, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(UpdateMediaMutation);

  if (loading && !data) {
    return <Loading />;
  }

  const { media } = data;

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        id: media.id,
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
      <Heading>Edit Media</Heading>
      {message === 'updated' && <Message text="Media updated." />}
      <FormWrap>
        <Form fields={mediaFields} data={media} buttonLabel="Update Media" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default EditMedia;
