import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import ShowForm from './Form';

/* eslint-disable react/prop-types */

@compose(
  graphql(
    gql`
      query CreateShowQuery {
        artists: terms(taxonomy: "artist", first: 250)
          @connection(key: "terms", filter: ["taxonomy"]) {
          ...ShowForm_terms
        }
        venues: terms(taxonomy: "venue", first: 250)
          @connection(key: "terms", filter: ["taxonomy"]) {
          ...ShowForm_terms
        }
      }
      ${ShowForm.fragments.terms}
    `,
    { options: { fetchPolicy: 'cache-and-network' } }
  ),
  graphql(gql`
    mutation CreateShowMutation($input: CreateShowInput!) {
      createShow(input: $input) {
        id
      }
    }
  `)
)
class AddShow extends Component {
  state = {
    message: null,
  };

  onSubmit = (e, updates) => {
    e.preventDefault();

    this.props
      .mutate({
        variables: {
          input: updates,
        },
      })
      .then(({ data: { createShow } }) => {
        document.documentElement.scrollTop = 0;
        this.props.history.push({
          pathname: `/show/${createShow.id}`,
        });
      })
      .catch(() => this.setState({ message: 'error' }));
  };

  render() {
    const {
      data: { loading, artists, venues },
    } = this.props;

    if (loading && !artists) {
      return <Loading />;
    }

    return (
      <>
        <Heading>Add Show</Heading>
        {this.state.message === 'error' && <Message text="Error adding show." />}
        <FormWrap>
          <ShowForm
            artists={artists}
            venues={venues}
            buttonLabel="Add Show"
            onSubmit={this.onSubmit}
          />
        </FormWrap>
      </>
    );
  }
}

export default AddShow;
