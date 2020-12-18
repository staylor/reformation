import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import ShowForm from './Form';

const showQuery = gql`
  query CreateShowQuery {
    artists: terms(taxonomy: "artist", first: 250) @cache(key: "admin") {
      ...ShowForm_terms
    }
    venues: terms(taxonomy: "venue", first: 250) @cache(key: "admin") {
      ...ShowForm_terms
    }
  }
  ${ShowForm.fragments.terms}
`;

const showMutation = gql`
  mutation CreateShowMutation($input: CreateShowInput!) {
    createShow(input: $input) {
      id
    }
  }
`;

function AddShow() {
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(showQuery, {
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(showMutation);

  if (loading && !data) {
    return <Loading />;
  }

  const { artists, venues } = data;

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        input: updates,
      },
    })
      .then(({ data: { createShow } }) => {
        document.documentElement.scrollTop = 0;
        history.push({
          pathname: `/show/${createShow.id}`,
        });
      })
      .catch(() => setMessage('error'));
  };

  return (
    <>
      <Heading>Add Show</Heading>
      {message === 'error' && <Message text="Error adding show." />}
      <FormWrap>
        <ShowForm artists={artists} venues={venues} buttonLabel="Add Show" onSubmit={onSubmit} />
      </FormWrap>
    </>
  );
}

export default AddShow;
