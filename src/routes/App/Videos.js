import React from 'react';
import Videos from 'components/Videos';
import Helmet from 'react-helmet-async';
import { Heading } from 'styles/utils';

/* eslint-disable react/prop-types */

export default function VideosRoute(props) {
  const {
    match: { params = {} },
  } = props;

  return (
    <>
      <Helmet>
        <title>{params.year ? `${params.year} » ` : ''}Videos</title>
      </Helmet>
      <Heading>{params.year || 'Videos'}</Heading>
      <Videos {...props} />
    </>
  );
}
