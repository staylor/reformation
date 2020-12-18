import React from 'react';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import Page from 'routes/Admin/Page';
import { FormWrap } from 'routes/Admin/styled';
import { useEditQuery, useSubmitEdit } from 'routes/Admin/utils';
import ShowForm from './Form';

const showQuery = gql`
  query ShowEditQuery($id: ObjID!) {
    show(id: $id) {
      ...ShowForm_show
    }
    artists: terms(taxonomy: "artist", first: 250) @cache(key: "admin") {
      ...ShowForm_terms
    }
    venues: terms(taxonomy: "venue", first: 250) @cache(key: "admin") {
      ...ShowForm_terms
    }
  }
  ${ShowForm.fragments.show}
  ${ShowForm.fragments.terms}
`;

const showMutation = gql`
  mutation UpdateShowMutation($id: ObjID!, $input: UpdateShowInput!) {
    updateShow(id: $id, input: $input) {
      ...ShowForm_show
    }
  }
  ${ShowForm.fragments.show}
`;

function EditShow() {
  const query = useEditQuery(showQuery);
  const { onSubmit, message } = useSubmitEdit({ mutation: showMutation });

  return (
    <Page query={query} title="Edit Show" add={{ to: '/show/add', label: 'Add Show' }}>
      {({ show, artists, venues }) => {
        return (
          <>
            {message === 'updated' && <Message text="Show updated." />}
            <FormWrap>
              <ShowForm
                show={show}
                artists={artists}
                venues={venues}
                buttonLabel="Update Show"
                onSubmit={onSubmit(show)}
              />
            </FormWrap>
          </>
        );
      }}
    </Page>
  );
}

export default EditShow;
