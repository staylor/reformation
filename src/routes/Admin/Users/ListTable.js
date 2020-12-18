import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import { Heading, HeaderAdd } from 'routes/Admin/styled';

/* eslint-disable react/no-multi-comp */

const columns = [
  {
    label: 'Name',
    render: (user, { mutate, refetch }) => {
      const onClick = e => {
        e.preventDefault();

        mutate({
          variables: {
            ids: [user.id],
          },
        }).then(() => {
          refetch();
        });
      };

      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/user/${user.id}`}>Edit</Link> |{' '}
            <a className="delete" onClick={onClick} href={`/user/${user.id}`}>
              Delete
            </a>
          </nav>
        </>
      );
    },
  },
];

function UsersListTable() {
  const { variables, refetch, loading, data } = useQuery(
    gql`
      query UsersAdminQuery {
        users @cache(key: "admin") {
          count
          edges {
            node {
              id
              name
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
    {
      variables: { first: 1000 },
      // This ensures that the table is up to date when users are mutated.
      // The alternative is to specify refetchQueries on all User mutations.
      fetchPolicy: 'cache-and-network',
    }
  );
  const [mutate] = useMutation(gql`
    mutation DeleteUserMutation($ids: [ObjID]!) {
      removeUser(ids: $ids)
    }
  `);

  if (loading && !data) {
    return <Loading />;
  }

  const { users } = data;

  return (
    <>
      <Heading>User</Heading>
      <HeaderAdd to="/user/add">Add User</HeaderAdd>
      <ListTable
        columns={columns}
        mutate={mutate}
        refetch={refetch}
        variables={variables}
        data={users}
        path="/user"
      />
    </>
  );
}

export default UsersListTable;
