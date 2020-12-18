import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import Page from 'routes/Admin/Page';
import { useAdminQuery, useSubmitDelete } from 'routes/Admin/utils';

/* eslint-disable react/no-multi-comp */

const columns = [
  {
    label: 'Name',
    render: (user, { onDelete }) => {
      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/user/${user.id}`}>Edit</Link> |{' '}
            <a className="delete" onClick={onDelete([user.id])} href={`/user/${user.id}`}>
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
  const variables = { first: 1000 };
  const query = useAdminQuery(usersQuery, variables);
  const onDelete = useSubmitDelete({ mutation: usersMutation, query });

  return (
    <Page query={query} title="Users" add={{ to: '/user/add', label: 'Add User' }}>
      {({ users }) => (
        <ListTable
          columns={columns}
          onDelete={onDelete}
          perPage={variables.first}
          data={users}
          path="/user"
        />
      )}
    </Page>
  );
}

export default UsersListTable;
