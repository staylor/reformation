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

const podcastMutation = gql`
  mutation DeletePodcastMutation($ids: [ObjID]!) {
    removePodcast(ids: $ids)
  }
`;

function PodcastListTable() {
  const query = useQuery(podcastsQuery, {
    variables: { first: 1000 },
    // This ensures that the table is up to date when podcasts are mutated.
    // The alternative is to specify refetchQueries on all Podcast mutations.
    fetchPolicy: 'cache-and-network',
  });
  const [mutate] = useMutation(podcastMutation);

  return (
    <Page query={query} title="Podcasts">
      {({ podcasts }) => (
        <>
          <HeaderAdd to="/podcast/add">Add Podcast</HeaderAdd>
          <ListTable
            columns={columns}
            mutate={mutate}
            refetch={query.refetch}
            variables={query.variables}
            data={podcasts}
            path="/podcast"
          />
        </>
      )}
    </Page>
  );
}

export default PodcastListTable;
