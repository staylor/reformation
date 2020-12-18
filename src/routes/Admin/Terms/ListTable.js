import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import ListTable, { renderThumbnail } from 'components/ListTable';
import { rowActionsClass, rowTitleClass, thumbnailColumnClass } from 'components/ListTable/styled';
import { offsetToCursor } from 'utils/connection';
import { Heading, HeaderAdd } from 'routes/Admin/styled';

/* eslint-disable react/no-multi-comp */

const PER_PAGE = 20;

function TermsListTable() {
  const params = useParams();
  const vars = { first: PER_PAGE, taxonomyId: params.taxonomyId };
  if (params.page) {
    const pageOffset = parseInt(params.page, 10) - 1;
    if (pageOffset > 0) {
      vars.after = offsetToCursor(pageOffset * PER_PAGE - 1);
    }
  }
  const { variables, refetch, loading, data } = useQuery(
    gql`
      query TermsAdminQuery(
        $first: Int
        $after: String
        $taxonomyId: ObjID!
        $taxonomy: String
        $search: String
      ) {
        terms(
          first: $first
          after: $after
          taxonomyId: $taxonomyId
          taxonomy: $taxonomy
          search: $search
        ) @cache(key: "admin") {
          taxonomy {
            id
            name
            slug
            plural
          }
          count
          edges {
            node {
              id
              name
              slug
              taxonomy {
                id
              }
              featuredMedia {
                ... on ImageUpload {
                  type
                  destination
                  crops {
                    fileName
                    width
                  }
                }
              }
              ... on Venue {
                capacity
                address
              }
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
    // This ensures that the table is up to date when taxonomies are mutated.
    // The alternative is to specify refetchQueries on all Taxonomy mutations.
    {
      variables: vars,
      fetchPolicy: 'cache-and-network',
    }
  );
  const [mutate] = useMutation(gql`
    mutation DeleteTermMutation($ids: [ObjID]!) {
      removeTerm(ids: $ids)
    }
  `);

  if (loading && !data) {
    return <Loading />;
  }

  const { terms } = data;

  let columns = [
    {
      className: thumbnailColumnClass,
      render: term => {
        if (term.featuredMedia && term.featuredMedia[0] && term.featuredMedia[0].type === 'image') {
          return renderThumbnail(term.featuredMedia[0], 'crops');
        }

        return null;
      },
    },
    {
      label: 'Name',
      render: term => {
        const onClick = e => {
          e.preventDefault();

          mutate({
            variables: {
              ids: [term.id],
            },
          }).then(() => {
            refetch();
          });
        };

        const urlPath = `/terms/${term.taxonomy.id}/${term.id}`;

        return (
          <>
            <strong className={rowTitleClass}>
              <Link to={urlPath}>{term.name}</Link>
            </strong>
            <nav className={rowActionsClass}>
              <Link to={urlPath}>Edit</Link> |{' '}
              <a className="delete" onClick={onClick} href={urlPath}>
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
  ];

  if (terms.taxonomy.slug === 'venue') {
    columns = columns.concat([
      {
        label: 'Capacity',
        prop: 'capacity',
      },
      {
        label: 'Address',
        prop: 'address',
      },
    ]);
  }

  return (
    <>
      <Heading>{terms.taxonomy.plural}</Heading>
      <HeaderAdd to={`/terms/${terms.taxonomy.id}/add`}>Add {terms.taxonomy.name}</HeaderAdd>
      <ListTable
        columns={columns}
        mutate={mutate}
        refetch={refetch}
        variables={variables}
        data={terms}
        path={`/terms/${terms.taxonomy.id}`}
      />
    </>
  );
}

export default TermsListTable;
