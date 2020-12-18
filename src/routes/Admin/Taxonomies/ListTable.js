import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import { Heading, HeaderAdd } from 'routes/Admin/styled';

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

function TaxonomiesListTable() {
  const { loading, variables, refetch, data } = useQuery(
    gql`
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
    `,
    {
      variables: { first: 1000 },
      // This ensures that the table is up to date when taxonomies are mutated.
      // The alternative is to specify refetchQueries on all Taxonomy mutations.
      fetchPolicy: 'cache-and-network',
    }
  );
  const [mutate] = useMutation(gql`
    mutation DeleteTaxonomyMutation($ids: [ObjID]!) {
      removeTaxonomy(ids: $ids)
    }
  `);

  if (loading && !data) {
    return <Loading />;
  }

  const { taxonomies } = data;

  return (
    <>
      <Heading>Taxonomy</Heading>
      <HeaderAdd to="/taxonomy/add">Add Taxonomy</HeaderAdd>
      <ListTable
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

export default TaxonomiesListTable;
