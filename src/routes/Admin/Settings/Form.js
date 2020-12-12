import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import Form from 'components/Form';
import { Heading, lineClass } from 'routes/Admin/styled';

/* eslint-disable react/prop-types */

function SettingsForm({
  query,
  mutation,
  id,
  title,
  buttonText = 'Update Settings',
  settingsFields,
}) {
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(query, {
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(mutation);

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        id,
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
      <Heading>{title}</Heading>
      <br className={lineClass} />
      {message === 'updated' && <Message text="Settings Updated." />}
      {loading && !data ? (
        <Loading />
      ) : (
        <Form
          fields={settingsFields}
          data={data.settings || {}}
          buttonLabel={buttonText}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}

export default SettingsForm;
