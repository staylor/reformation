import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import TermForm from './Form';

/* eslint-disable react/prop-types */

@graphql(
  gql`
    query TermTaxonomyQuery($id: ObjID) {
      taxonomy(id: $id) {
        ...TermForm_taxonomy
      }
    }
    ${TermForm.fragments.taxonomy}
  `,
  {
    options: ({ match: { params } }) => ({
      variables: { id: params.taxonomyId },
    }),
  }
)
@graphql(
  gql`
    mutation CreateTermMutation($input: CreateTermInput!) {
      createTerm(input: $input) {
        ...TermForm_term
      }
    }
    ${TermForm.fragments.term}
  `
)
class AddTerm extends Component {
  state = {
    message: null,
  };

  onSubmit = (e, updates) => {
    e.preventDefault();

    const taxonomyId = this.props.data.taxonomy.id;

    this.props
      .mutate({
        variables: {
          input: {
            ...updates,
            taxonomy: taxonomyId,
          },
        },
      })
      .then(({ data: { createTerm } }) => {
        this.props.history.push({
          pathname: `/terms/${createTerm.taxonomy.id}/${createTerm.id}`,
        });
      })
      .catch(() => this.setState({ message: 'error' }));
  };

  render() {
    const {
      data: { loading, taxonomy },
    } = this.props;

    if (loading && !taxonomy) {
      return <Loading />;
    }

    return (
      <>
        <Heading>{`Add ${taxonomy.name}`}</Heading>
        {this.state.message === 'error' && <Message text={`Error adding ${taxonomy.name}.`} />}
        <FormWrap>
          <TermForm
            term={{ taxonomy }}
            buttonLabel={`Add ${taxonomy.name}`}
            onSubmit={this.onSubmit}
          />
        </FormWrap>
      </>
    );
  }
}

export default AddTerm;
