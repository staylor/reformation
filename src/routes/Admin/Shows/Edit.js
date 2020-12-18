import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, HeaderAdd, FormWrap } from 'routes/Admin/styled';
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
  const params = useParams();
  const [message, setMessage] = useState(null);
  const { loading, data } = useQuery(showQuery, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(showMutation);

  if (loading && !data) {
    return <Loading />;
  }

  const { show, artists, venues } = data;

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        id: show.id,
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
      <Heading>Edit Show</Heading>
      <HeaderAdd to="/show/add">Add Show</HeaderAdd>
      {message === 'updated' && <Message text="Show updated." />}
      <FormWrap>
        <ShowForm
          show={show}
          artists={artists}
          venues={venues}
          buttonLabel="Update Show"
          onSubmit={onSubmit}
        />
      </FormWrap>
    </>
  );
}

export default EditShow;
