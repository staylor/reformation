import React from 'react';
import Video from 'components/Videos/Video';
import Image from './Image';

/* eslint-disable react/prop-types */

export default function Media(props) {
  const { contentState, block } = props;
  const entityKey = block.getEntityAt(0);
  if (!entityKey) {
    return null;
  }
  const entity = contentState.getEntity(entityKey);
  const type = entity.getType();

  if (type === 'EMBED') {
    const { html } = entity.getData();
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }

  if (type === 'IMAGE') {
    const { image, size } = entity.getData();
    return React.createElement(Image, { image, size });
  }

  if (type === 'VIDEO') {
    const { video } = entity.getData();
    return <Video video={video} embed />;
  }

  return null;
}
