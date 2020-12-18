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
    label: 'Title',
    render: (podcast, { mutate, refetch }) => {
      const onClick = e => {
        e.preventDefault();

        mutate({
          variables: {
            ids: [podcast.id],
          },
        }).then(() => refetch());
      };

      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/podcast/${podcast.id}`}>{podcast.title}</Link>
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/podcast/${podcast.id}`}>Edit</Link> |{' '}
            <a className="delete" onClick={onClick} href={`/podcast/${podcast.id}`}>
              Delete
            </a>
          </nav>
        </>
      );
    },
  },
];

const podcastsQuery = gql`
  query PodcastsAdminQuery {
    podcasts @cache(key: "admin") {
      count
      edges {
        node {
          id
          title
          image {
            id
            type
            destination
            crops {
              fileName
              width
            }
          }
          audio {
            id
            type
            destination
            images {
              fileName
              width
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

function PodcastListTable() {
  const { variables, refetch, loading, data } = useQuery(podcastsQuery, {
    variables: { first: 1000 },
    // This ensures that the table is up to date when podcasts are mutated.
    // The alternative is to specify refetchQueries on all Podcast mutations.
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(gql`
    mutation DeletePodcastMutation($ids: [ObjID]!) {
      removePodcast(ids: $ids)
    }
  `);

  const header = (
    <>
      <Heading>Podcast</Heading>
      <HeaderAdd to="/podcast/add">Add Podcast</HeaderAdd>
    </>
  );

  if (loading && !data) {
    return (
      <>
        {header}
        <Loading />
      </>
    );
  }

  const { podcasts } = data;

  return (
    <>
      {header}
      <ListTable
        columns={columns}
        mutate={mutate}
        refetch={refetch}
        variables={variables}
        data={podcasts}
        path="/podcast"
      />
    </>
  );
}

export default PodcastListTable;
