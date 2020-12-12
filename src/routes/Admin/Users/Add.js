import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import { Heading, FormWrap } from 'routes/Admin/styled';
import UserForm from './Form';

/* eslint-disable react/prop-types */

@graphql(gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`)
class AddUser extends Component {
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
      .then(({ data: { createUser } }) => {
        this.props.history.push({
          pathname: `/user/${createUser.id}`,
        });
      })
      .catch(() => this.setState({ message: 'error' }));
  };

  render() {
    return (
      <>
        <Heading>Add User</Heading>
        {this.state.message === 'error' && <Message text="Error adding user." />}
        <FormWrap>
          <UserForm buttonLabel="Add User" onSubmit={this.onSubmit} />
        </FormWrap>
      </>
    );
  }
}

export default AddUser;
