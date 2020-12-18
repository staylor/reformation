import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Message from 'components/Form/Message';
import Form from 'components/Form';
import { lineClass } from 'routes/Admin/styled';
import Page from 'routes/Admin/Page';

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
  const q = useQuery(query, {
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
    <Page query={q} title={title}>
      {({ settings }) => (
        <>
          <br className={lineClass} />
          {message === 'updated' && <Message text="Settings Updated." />}
          <Form
            fields={settingsFields}
            data={settings || {}}
            buttonLabel={buttonText}
            onSubmit={onSubmit}
          />
        </>
      )}
    </Page>
  );
}

export default SettingsForm;
