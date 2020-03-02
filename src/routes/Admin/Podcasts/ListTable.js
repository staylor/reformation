import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass } from 'components/ListTable/styled';
import { Heading, HeaderAdd } from 'routes/Admin/styled';

/* eslint-disable react/prop-types */

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

@compose(
  graphql(
    gql`
      query PodcastsQuery {
        podcasts @connection(key: "podcasts") {
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
    `,
    {
      options: {
        variables: { first: 1000 },
        // This ensures that the table is up to date when podcasts are mutated.
        // The alternative is to specify refetchQueries on all Podcast mutations.
        fetchPolicy: 'cache-and-network',
      },
    }
  ),
  graphql(
    gql`
      mutation DeletePodcastMutation($ids: [ObjID]!) {
        removePodcast(ids: $ids)
      }
    `
  )
)
class Podcasts extends Component {
  render() {
    const {
      mutate,
      data: { variables, loading, podcasts },
    } = this.props;

    if (loading && !podcasts) {
      return <Loading />;
    }

    return (
      <>
        <Heading>Podcast</Heading>
        <HeaderAdd to="/podcast/add">Add Podcast</HeaderAdd>
        <ListTable
          columns={columns}
          mutate={mutate}
          variables={variables}
          data={podcasts}
          path="/podcast"
        />
      </>
    );
  }
}

export default Podcasts;
