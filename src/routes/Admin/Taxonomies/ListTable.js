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
    render: (taxonomy, { onDelete }) => {
      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/taxonomy/${taxonomy.id}`}>{taxonomy.name}</Link>
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/taxonomy/${taxonomy.id}`}>Edit</Link> |{' '}
            <a
              className="delete"
              onClick={onDelete([taxonomy.id])}
              href={`/taxonomy/${taxonomy.id}`}
            >
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
  const variables = { first: 1000 };
  const query = useAdminQuery(taxQuery, variables);
  const onDelete = useSubmitDelete({ mutation: taxMutation, query });

  return (
    <Page query={query} title="Taxonomies" add={{ to: '/taxonomy/add', label: 'Add Taxonomy' }}>
      {({ taxonomies }) => (
        <ListTable
          columns={columns}
          onDelete={onDelete}
          perPage={variables.first}
          data={taxonomies}
          path="/taxonomy"
        />
      )}
    </Page>
  );
}

export default TaxonomiesListTable;
