import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import Page from 'routes/Admin/Page';
import { HeaderAdd } from 'routes/Admin/styled';

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

const usersQuery = gql`
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
`;

const usersMutation = gql`
  mutation DeleteUserMutation($ids: [ObjID]!) {
    removeUser(ids: $ids)
  }
`;

function UsersListTable() {
  const query = useQuery(usersQuery, {
    variables: { first: 1000 },
    // This ensures that the table is up to date when users are mutated.
    // The alternative is to specify refetchQueries on all User mutations.
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(usersMutation);

  return (
    <Page query={query} title="Users">
      {({ users }) => (
        <>
          <HeaderAdd to="/user/add">Add User</HeaderAdd>
          <ListTable
            columns={columns}
            mutate={mutate}
            refetch={query.refetch}
            variables={query.variables}
            data={users}
            path="/user"
          />
        </>
      )}
    </Page>
  );
}

export default UsersListTable;
