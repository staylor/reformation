import React, { useRef, useEffect } from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Heading } from 'styles/utils';
import * as styles from './styled';

/* eslint-disable react/prop-types */

const { VideoLink, Placeholder, Title, EmbedTitle } = styles;

// type Thumbnail = {
//   width: number,
//   height: number,
//   url: string,
//   className?: string,
// };
//
// type Props = {
//   video: {
//     dataId: string,
//     title: string,
//     slug: string,
//     thumbnails: Array<Thumbnail>,
//   },
//   single: boolean,
//   embed: boolean,
// };

const maxWidth = 640;

const findThumb = (thumbs, { single, embed }) => {
  const sizes = embed || single ? [640, 480, 320] : [480, 640, 320];
  let thumb = thumbs.find(t => t.width === sizes[0]);
  if (!thumb) {
    thumb = thumbs.find(t => t.width === sizes[1]);
    if (!thumb) {
      thumb = thumbs.find(t => t.width === sizes[2]);
    }
  }
  return thumb;
};

function Video({ video, single = false, embed = false }) {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      const oldHeight = imageRef.current.offsetHeight;
      const newHeight = Math.ceil((9 / 16) * imageRef.current.offsetWidth);
      const offset = `${-1 * ((oldHeight - newHeight) / 2)}px`;
      imageRef.current.style.marginTop = offset;
      imageRef.current.style.marginBottom = offset;
      imageRef.current.style.opacity = 1;
    }
  }, []);

  const onClick = e => {
    e.preventDefault();

    const iframe = document.createElement('iframe');
    // $FlowFixMe
    iframe.height = `${Math.ceil((9 / 16) * e.currentTarget.offsetWidth)}`;
    iframe.width = `${maxWidth}`;
    iframe.className = embed ? '' : styles.iframeClass;
    iframe.frameBorder = '0';
    iframe.src = `https://www.youtube.com/embed/${video.dataId}?autoplay=1`;

    // $FlowFixMe
    e.currentTarget.innerHTML = iframe.outerHTML;
  };

  const thumb = findThumb(video.thumbnails, { single, embed });

  const placeholder = (
    <Placeholder>
      {thumb && (
        <img src={thumb.url} alt={video.title} className={thumb.className} ref={imageRef} />
      )}
      <figcaption>{video.title}</figcaption>
    </Placeholder>
  );

  if (embed) {
    return (
      <>
        <VideoLink
          to={`/video/${video.slug}`}
          onClick={onClick}
          width={thumb ? thumb.width : maxWidth}
          className={styles.embedVideoLinkClass}
        >
          {placeholder}
        </VideoLink>
        <EmbedTitle>
          {single ? video.title : <Link to={`/video/${video.slug}`}>{video.title}</Link>}
        </EmbedTitle>
      </>
    );
  }

  return (
    <article>
      {single ? (
        <Heading>{video.title}</Heading>
      ) : (
        <Title>
          <Link to={`/video/${video.slug}`}>{video.title}</Link>
        </Title>
      )}

      <VideoLink to={`/video/${video.slug}`} onClick={onClick}>
        {placeholder}
      </VideoLink>
    </article>
  );
}

// $FlowFixMe
Video.fragments = {
  video: gql`
    fragment Video_video on Video {
      dataId
      title
      slug
      thumbnails {
        width
        height
        url
      }
    }
  `,
};

export default Video;
