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

const taxQuery = gql`
  query TaxonomiesAdminQuery {
    taxonomies @cache(key: "admin") {
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
`;

const taxMutation = gql`
  mutation DeleteTaxonomyMutation($ids: [ObjID]!) {
    removeTaxonomy(ids: $ids)
  }
`;

function TaxonomiesListTable() {
  const query = useQuery(taxQuery, {
    variables: { first: 1000 },
    // This ensures that the table is up to date when taxonomies are mutated.
    // The alternative is to specify refetchQueries on all Taxonomy mutations.
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(taxMutation);

  return (
    <Page query={query} title="Taxonomies">
      {({ taxonomies }) => (
        <>
          <HeaderAdd to="/taxonomy/add">Add Taxonomy</HeaderAdd>
          <ListTable
            columns={columns}
            mutate={mutate}
            refetch={query.refetch}
            variables={query.variables}
            data={taxonomies}
            path="/taxonomy"
          />
        </>
      )}
    </Page>
  );
}

export default TaxonomiesListTable;
