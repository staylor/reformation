import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import Message from 'components/Form/Message';
import { FormWrap } from 'routes/Admin/styled';
import PostForm from './Form';

/* eslint-disable react/prop-types */

@graphql(gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostForm_post
    }
  }
  ${PostForm.fragments.post}
`)
class AddPost extends Component {
  state = {
    message: null,
  };

  onSubmit = (e, updates) => {
    e.preventDefault();

    const input = { ...updates };

    this.props
      .mutate({
        variables: {
          input,
        },
      })
      .then(({ data: { createPost } }) => {
        this.props.history.push({
          pathname: `/post/${createPost.id}`,
        });
      })
      .catch(err => this.setState({ message: err.message }));
  };

  render() {
    return (
      <>
        {this.state.message && <Message text={this.state.message} />}
        <FormWrap>
          <PostForm post={{}} buttonLabel="Add Post" onSubmit={this.onSubmit} />
        </FormWrap>
      </>
    );
  }
}

export default AddPost;
