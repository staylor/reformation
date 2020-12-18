import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import { offsetToCursor } from 'utils/connection';
import Page from 'routes/Admin/Page';
import { HeaderAdd } from 'routes/Admin/styled';

/* eslint-disable react/no-multi-comp */

const PER_PAGE = 20;

const columns = [
  {
    label: 'Title',
    render: (show, { mutate, refetch }) => {
      const onClick = e => {
        e.preventDefault();

        mutate({
          variables: {
            ids: [show.id],
          },
        }).then(() => {
          refetch();
        });
      };

      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/show/${show.id}`}>{show.title || '(No Title)'}</Link>
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/show/${show.id}`}>Edit</Link> |{' '}
            <a className="delete" onClick={onClick} href={`/show/${show.id}`}>
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
  const params = useParams();
  const variables = { first: PER_PAGE, order: 'DESC' };
  if (params.page) {
    const pageOffset = parseInt(params.page, 10) - 1;
    if (pageOffset > 0) {
      variables.after = offsetToCursor(pageOffset * PER_PAGE - 1);
    }
  }
  const query = useQuery(showsQuery, {
    variables,
    // This ensures that the table is up to date when shows are mutated.
    // The alternative is to specify refetchQueries on all Show mutations.
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(showsMutation);

  return (
    <Page query={query} title="Show">
      {({ shows }) => (
        <>
          <HeaderAdd to="/show/add">Add Show</HeaderAdd>
          <ListTable
            columns={columns}
            mutate={mutate}
            refetch={query.refetch}
            variables={query.variables}
            data={shows}
            path="/show"
          />
        </>
      )}
    </Page>
  );
}

export default ShowsListTable;
