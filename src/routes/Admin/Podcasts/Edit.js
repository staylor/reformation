import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import PodcastForm from './Form';

/* eslint-disable react/prop-types */

@graphql(
  gql`
    query PodcastAdminQuery($id: ObjID!) {
      podcast(id: $id) {
        ...PodcastForm_podcast
      }
    }
    ${PodcastForm.fragments.podcast}
  `,
  {
    options: ({ match: { params } }) => ({
      variables: { id: params.id },
    }),
  }
)
@graphql(gql`
  mutation UpdatePodcastMutation($id: ObjID!, $input: UpdatePodcastInput!) {
    updatePodcast(id: $id, input: $input) {
      ...PodcastForm_podcast
    }
  }
  ${PodcastForm.fragments.podcast}
`)
class EditPodcast extends Component {
  state = {
    message: null,
  };

  onSubmit = (e, updates) => {
    e.preventDefault();

    const { podcast } = this.props.data;
    this.props
      .mutate({
        variables: {
          id: podcast.id,
          input: updates,
        },
      })
      .then(() => {
        this.setState({ message: 'updated' });
        document.documentElement.scrollTop = 0;
      })
      .catch(() => this.setState({ message: 'error' }));
  };

  render() {
    const {
      data: { loading, podcast },
    } = this.props;

    if (loading && !podcast) {
      return <Loading />;
    }

    return (
      <>
        <Heading>Edit Podcast</Heading>
        {this.state.message === 'updated' && <Message text="Podcast updated." />}
        <FormWrap>
          <PodcastForm podcast={podcast} buttonLabel="Update Podcast" onSubmit={this.onSubmit} />
        </FormWrap>
      </>
    );
  }
}

export default EditPodcast;
