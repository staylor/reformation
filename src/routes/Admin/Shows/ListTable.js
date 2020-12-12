import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import { offsetToCursor } from 'utils/connection';
import { Heading, HeaderAdd } from 'routes/Admin/styled';

/* eslint-disable react/prop-types,react/no-multi-comp */

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

@graphql(
  gql`
    query ShowQuery(
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
      ) @connection(key: "shows", filter: ["date", "taxonomy", "term", "search"]) {
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
  `,
  {
    options: ({ match }) => {
      const { params } = match;

      const variables = { first: PER_PAGE, order: 'DESC' };
      if (params.page) {
        const pageOffset = parseInt(params.page, 10) - 1;
        if (pageOffset > 0) {
          variables.after = offsetToCursor(pageOffset * PER_PAGE - 1);
        }
      }

      return {
        variables,
        // This ensures that the table is up to date when shows are mutated.
        // The alternative is to specify refetchQueries on all Show mutations.
        fetchPolicy: 'cache-and-network',
      };
    },
  }
)
@graphql(
  gql`
    mutation DeleteShowMutation($ids: [ObjID]!) {
      removeShow(ids: $ids)
    }
  `
)
class Shows extends Component {
  render() {
    const {
      location,
      match,
      mutate,
      data: { loading, shows, refetch, variables },
    } = this.props;

    if (loading && !shows) {
      return <Loading />;
    }

    return (
      <>
        <Heading>Show</Heading>
        <HeaderAdd to="/show/add">Add Show</HeaderAdd>
        <ListTable
          location={location}
          match={match}
          columns={columns}
          mutate={mutate}
          refetch={refetch}
          variables={variables}
          data={shows}
          path="/show"
        />
      </>
    );
  }
}

export default Shows;
