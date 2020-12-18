import React from 'react';
import Loading from 'components/Loading';
import { Heading } from './styled';

/* eslint-disable react/prop-types */

function Page({ query, title, children }) {
  const { loading, data } = query;
  if (loading && !data) {
    return (
      <>
        <Heading>{title}</Heading>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Heading>{title}</Heading>
      {children(data)}
    </>
  );
}

export default Page;
