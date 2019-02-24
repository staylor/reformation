import React from 'react';

/* eslint-disable react/prop-types, no-bitwise */

export default function VideoInfo({ media }) {
  return (
    <>
      <strong>Duration:</strong> {~~(media.duration / 60)} mins, {Math.floor(media.duration % 60)}{' '}
      seconds
      <br />
      <strong>Dimensions:</strong> {media.width} x {media.height}
    </>
  );
}
