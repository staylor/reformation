import React from 'react';
import Loading from 'components/Loading';
import { Heading, HeaderAdd } from './styled';

/* eslint-disable react/prop-types */

function Page({ query, title, add, children }) {
  const { loading, data } = query;
  const header = (
    <>
      <Heading>{title}</Heading>
      {add && <HeaderAdd to={add.to}>{add.label}</HeaderAdd>}
    </>
  );

  if (loading && !data) {
    return (
      <>
        {header}
        <Loading />
      </>
    );
  }

  return (
    <>
      {header}
      {children(data)}
    </>
  );
}

export default Page;
