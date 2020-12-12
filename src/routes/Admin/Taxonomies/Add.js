import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import TaxonomyForm from './Form';

/* eslint-disable react/prop-types */

@graphql(
  gql`
    mutation CreateTaxonomyMutation($input: CreateTaxonomyInput!) {
      createTaxonomy(input: $input) {
        ...TaxonomyForm_taxonomy
      }
    }
    ${TaxonomyForm.fragments.taxonomy}
  `
)
class AddTaxonomy extends Component {
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
      .then(({ data: { createTaxonomy } }) => {
        document.documentElement.scrollTop = 0;
        this.props.history.push({
          pathname: `/taxonomy/${createTaxonomy.id}`,
        });
      })
      .catch(() => this.setState({ message: 'error' }));
  };

  render() {
    return (
      <>
        <Heading>Add Taxonomy</Heading>
        {this.state.message === 'error' && <Message text="Error adding taxonomy." />}
        <FormWrap>
          <TaxonomyForm buttonLabel="Add Taxonomy" onSubmit={this.onSubmit} />
        </FormWrap>
      </>
    );
  }
}

export default AddTaxonomy;
