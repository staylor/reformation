import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import { Heading, HeaderAdd } from 'routes/Admin/styled';
import TaxonomyQuery from './TaxonomyQuery.graphql';

/* eslint-disable react/prop-types */

const columns = [
  {
    label: 'Name',
    render: (taxonomy, { mutate }) => {
      const onClick = e => {
        e.preventDefault();

        mutate({
          variables: {
            ids: [taxonomy.id],
          },
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
  graphql(TaxonomyQuery, {
    options: {
      variables: { first: 1000 },
      // This ensures that the table is up to date when taxonomies are mutated.
      // The alternative is to specify refetchQueries on all Taxonomy mutations.
      fetchPolicy: 'cache-and-network',
    },
  }),
  graphql(
    gql`
      mutation DeleteTaxonomyMutation($ids: [ObjID]!) {
        removeTaxonomy(ids: $ids)
      }
    `,
    { options: { refetchQueries: [{ query: TaxonomyQuery }] } }
  )
)
class Taxonomies extends Component {
  render() {
    const {
      location,
      match,
      mutate,
      data: { loading, taxonomies, variables },
    } = this.props;

    if (loading && !taxonomies) {
      return <Loading />;
    }

    return (
      <>
        <Heading>Taxonomy</Heading>
        <HeaderAdd to="/taxonomy/add">Add Taxonomy</HeaderAdd>
        <ListTable
          {...{ location, match, columns, mutate, variables }}
          data={taxonomies}
          path="/taxonomy"
        />
      </>
    );
  }
}

export default Taxonomies;
