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
    label: 'Title',
    render: (podcast, { onDelete }) => {
      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/podcast/${podcast.id}`}>{podcast.title}</Link>
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/podcast/${podcast.id}`}>Edit</Link> |{' '}
            <a className="delete" onClick={onDelete([podcast.id])} href={`/podcast/${podcast.id}`}>
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
  const variables = { first: 1000 };
  const query = useAdminQuery(podcastsQuery, variables);
  const onDelete = useSubmitDelete({ mutation: podcastMutation, query });

  return (
    <Page query={query} title="Podcasts" add={{ to: '/podcast/add', label: 'Add Podcast' }}>
      {({ podcasts }) => (
        <ListTable
          columns={columns}
          onDelete={onDelete}
          perPage={variables.first}
          data={podcasts}
          path="/podcast"
        />
      )}
    </Page>
  );
}

export default PodcastListTable;
