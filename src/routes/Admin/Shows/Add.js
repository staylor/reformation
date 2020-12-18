import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Message from 'components/Form/Message';
import Page from 'routes/Admin/Page';
import { FormWrap } from 'routes/Admin/styled';
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
  const query = useQuery(showQuery, {
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(showMutation);

  return (
    <Page query={query} title="Add Show">
      {({ artists, venues }) => {
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
            {message === 'error' && <Message text="Error adding show." />}
            <FormWrap>
              <ShowForm
                artists={artists}
                venues={venues}
                buttonLabel="Add Show"
                onSubmit={onSubmit}
              />
            </FormWrap>
          </>
        );
      }}
    </Page>
  );
}

export default AddShow;
