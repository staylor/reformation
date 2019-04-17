import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import { offsetToCursor } from 'utils/connection';
import { Heading, HeaderAdd } from 'routes/Admin/styled';
import PostsQuery from './PostsQuery.graphql';

/* eslint-disable react/prop-types */

const PER_PAGE = 20;

const columns = [
  {
    label: 'Title',
    render: (post, { mutate, variables }) => {
      const onClick = e => {
        e.preventDefault();

        mutate({
          refetchQueries: [{ query: PostsQuery, variables }],
          variables: {
            ids: [post.id],
          },
        });
      };

      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            {post.status === 'DRAFT' ? ' - Draft' : ''}
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/post/${post.id}`}>Edit</Link> | <a href={`/post/${post.slug}`}>View</a> |{' '}
            <a className="delete" onClick={onClick} href={`/post/${post.id}`}>
              Delete
            </a>
          </nav>
        </>
      );
    },
  },
  {
    label: 'Slug',
    prop: 'slug',
  },
  {
    label: 'Date',
    prop: 'date',
    type: 'date',
  },
];

@compose(
  graphql(PostsQuery, {
    options: ({ match }) => {
      const { params } = match;

      const variables = { first: PER_PAGE };
      if (params.page) {
        const pageOffset = parseInt(params.page, 10) - 1;
        if (pageOffset > 0) {
          variables.after = offsetToCursor(pageOffset * PER_PAGE - 1);
        }
      }
      // This ensures that the table is up to date when posts are mutated.
      // The alternative is to specify refetchQueries on all Post mutations.
      return { variables, fetchPolicy: 'cache-and-network' };
    },
  }),
  graphql(gql`
    mutation DeletePostMutation($ids: [ObjID]!) {
      removePost(ids: $ids)
    }
  `)
)
class Posts extends Component {
  render() {
    const {
      location,
      match,
      mutate,
      data: { variables, loading, posts },
    } = this.props;

    if (loading && !posts) {
      return <Loading />;
    }

    return (
      <>
        <Heading>Posts</Heading>
        <HeaderAdd to="/post/add">Add Post</HeaderAdd>
        <ListTable {...{ location, match, columns, mutate, variables }} data={posts} path="/post" />
      </>
    );
  }
}

export default Posts;
