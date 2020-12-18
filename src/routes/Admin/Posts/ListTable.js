import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import Page from 'routes/Admin/Page';
import { usePageOffset, useAdminQuery, useSubmitDelete } from 'routes/Admin/utils';

/* eslint-disable react/no-multi-comp */

const PER_PAGE = 20;

const columns = [
  {
    label: 'Title',
    render: (post, { onDelete }) => {
      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            {post.status === 'DRAFT' ? ' - Draft' : ''}
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/post/${post.id}`}>Edit</Link> | <a href={`/post/${post.slug}`}>View</a> |{' '}
            <a className="delete" onClick={onDelete([post.id])} href={`/post/${post.id}`}>
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

const postsQuery = gql`
  query PostsAdminQuery($first: Int, $after: String, $search: String) {
    posts(first: $first, after: $after, search: $search) @cache(key: "admin") {
      count
      edges {
        node {
          id
          title
          slug
          status
          date
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const postsMutation = gql`
  mutation DeletePostMutation($ids: [ObjID]!) {
    removePost(ids: $ids)
  }
`;

function PostsListTable() {
  const variables = usePageOffset({ first: PER_PAGE });
  const query = useAdminQuery(postsQuery, variables);
  const onDelete = useSubmitDelete({ mutation: postsMutation, query });

  return (
    <Page query={query} title="Posts" add={{ to: '/post/add', label: 'Add Post' }}>
      {({ posts }) => <ListTable columns={columns} onDelete={onDelete} data={posts} path="/post" />}
    </Page>
  );
}

export default PostsListTable;
