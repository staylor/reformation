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
    render: (show, { onDelete }) => {
      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/show/${show.id}`}>{show.title || '(No Title)'}</Link>
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/show/${show.id}`}>Edit</Link> |{' '}
            <a className="delete" onClick={onDelete([show.id])} href={`/show/${show.id}`}>
              Delete
            </a>
          </nav>
        </>
      );
    },
  },
  {
    label: 'Artist',
    render: show => show.artist.name,
  },
  {
    label: 'Venue',
    render: show => show.venue.name,
  },
  {
    label: 'Date',
    prop: 'date',
    type: 'date',
  },
];

const showsQuery = gql`
  query ShowsAdminQuery(
    $first: Int
    $after: String
    $date: Float
    $taxonomy: String
    $term: String
    $search: String
    $order: ShowOrder
  ) {
    shows(
      first: $first
      after: $after
      date: $date
      taxonomy: $taxonomy
      term: $term
      search: $search
      order: $order
    ) @cache(key: "admin") {
      count
      edges {
        node {
          id
          title
          date
          artist {
            id
            name
          }
          venue {
            id
            name
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const showsMutation = gql`
  mutation DeleteShowMutation($ids: [ObjID]!) {
    removeShow(ids: $ids)
  }
`;

function ShowsListTable() {
  const variables = usePageOffset({ first: PER_PAGE, order: 'DESC' });
  const query = useAdminQuery(showsQuery, variables);
  const onDelete = useSubmitDelete({ mutation: showsMutation, query });

  return (
    <Page query={query} title="Show" add={{ to: '/show/add', label: 'Add Show' }}>
      {({ shows }) => <ListTable columns={columns} onDelete={onDelete} data={shows} path="/show" />}
    </Page>
  );
}

export default ShowsListTable;
