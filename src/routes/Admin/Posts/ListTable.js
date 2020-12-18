import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import { offsetToCursor } from 'utils/connection';
import { Heading, HeaderAdd } from 'routes/Admin/styled';

/* eslint-disable react/no-multi-comp */

const PER_PAGE = 20;

const columns = [
  {
    label: 'Title',
    render: (post, { mutate, refetch }) => {
      const onClick = e => {
        e.preventDefault();

        mutate({
          variables: {
            ids: [post.id],
          },
        }).then(() => {
          refetch();
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

function PostsListTable() {
  const params = useParams();
  const vars = { first: PER_PAGE };
  if (params.page) {
    const pageOffset = parseInt(params.page, 10) - 1;
    if (pageOffset > 0) {
      vars.after = offsetToCursor(pageOffset * PER_PAGE - 1);
    }
  }
  const { variables, refetch, loading, data } = useQuery(postsQuery, {
    variables: vars,
    // This ensures that the table is up to date when uploads are mutated.
    // The alternative is to specify refetchQueries on all Post mutations.
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(gql`
    mutation DeletePostMutation($ids: [ObjID]!) {
      removePost(ids: $ids)
    }
  `);

  const header = (
    <>
      <Heading>Posts</Heading>
      <HeaderAdd to="/post/add">Add Post</HeaderAdd>
    </>
  );

  if (loading && !data) {
    return (
      <>
        {header}
        <Loading />
      </>
    );
  }

  const { posts } = data;

  return (
    <>
      {header}
      <ListTable
        columns={columns}
        mutate={mutate}
        refetch={refetch}
        variables={variables}
        data={posts}
        path="/post"
      />
    </>
  );
}

export default PostsListTable;
