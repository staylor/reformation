import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import { Heading, HeaderAdd } from 'routes/Admin/styled';

/* eslint-disable react/prop-types,react/no-multi-comp */

const columns = [
  {
    label: 'Name',
    render: (taxonomy, { mutate, refetch }) => {
      const onClick = e => {
        e.preventDefault();

        mutate({
          variables: {
            ids: [taxonomy.id],
          },
        }).then(() => {
          refetch();
        });
      };

      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/taxonomy/${taxonomy.id}`}>{taxonomy.name}</Link>
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/taxonomy/${taxonomy.id}`}>Edit</Link> |{' '}
            <a className="delete" onClick={onClick} href={`/taxonomy/${taxonomy.id}`}>
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
    label: 'Description',
    prop: 'description',
    type: 'textarea',
    editable: true,
  },
];

@compose(
  graphql(
    gql`
      query TaxonomyQuery {
        taxonomies @connection(key: "taxonomies") {
          count
          edges {
            node {
              id
              name
              slug
              description
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
    {
      options: {
        variables: { first: 1000 },
        // This ensures that the table is up to date when taxonomies are mutated.
        // The alternative is to specify refetchQueries on all Taxonomy mutations.
        fetchPolicy: 'cache-and-network',
      },
    }
  ),
  graphql(
    gql`
      mutation DeleteTaxonomyMutation($ids: [ObjID]!) {
        removeTaxonomy(ids: $ids)
      }
    `
  )
)
class Taxonomies extends Component {
  render() {
    const {
      location,
      match,
      mutate,
      data: { loading, taxonomies, refetch, variables },
    } = this.props;

    if (loading && !taxonomies) {
      return <Loading />;
    }

    return (
      <>
        <Heading>Taxonomy</Heading>
        <HeaderAdd to="/taxonomy/add">Add Taxonomy</HeaderAdd>
        <ListTable
          location={location}
          match={match}
          columns={columns}
          mutate={mutate}
          refetch={refetch}
          variables={variables}
          data={taxonomies}
          path="/taxonomy"
        />
      </>
    );
  }
}

export default Taxonomies;
