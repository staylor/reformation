import React from 'react';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import Page from 'routes/Admin/Page';
import { FormWrap } from 'routes/Admin/styled';
import { useAdminQuery, useSubmitNew } from 'routes/Admin/utils';
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
  const query = useAdminQuery(showQuery);
  const { onSubmit, message } = useSubmitNew({
    mutation: showMutation,
    path: 'show',
    key: 'createShow',
  });

  return (
    <Page query={query} title="Add Show">
      {({ artists, venues }) => {
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
