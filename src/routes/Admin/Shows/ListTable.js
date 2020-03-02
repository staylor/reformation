import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import { offsetToCursor } from 'utils/connection';
import { Heading, HeaderAdd } from 'routes/Admin/styled';
import ShowQuery from './ShowQuery.graphql';

/* eslint-disable react/prop-types */

const PER_PAGE = 20;

const columns = [
  {
    label: 'Title',
    render: (show, { mutate, variables }) => {
      const onClick = e => {
        e.preventDefault();

        mutate({
          refetchQueries: [{ query: ShowQuery, variables }],
          variables: {
            ids: [show.id],
          },
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

@compose(
  graphql(ShowQuery, {
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
  }),
  graphql(
    gql`
      mutation DeleteShowMutation($ids: [ObjID]!) {
        removeShow(ids: $ids)
      }
    `
  )
)
class Shows extends Component {
  render() {
    const {
      mutate,
      data: { variables, loading, shows },
    } = this.props;

    if (loading && !shows) {
      return <Loading />;
    }

    return (
      <>
        <Heading>Show</Heading>
        <HeaderAdd to="/show/add">Add Show</HeaderAdd>
        <ListTable
          columns={columns}
          mutate={mutate}
          variables={variables}
          data={shows}
          path="/show"
        />
      </>
    );
  }
}

export default Shows;
