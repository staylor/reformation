import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import * as styles from './styled';

/* eslint-disable react/prop-types */

@graphql(
  gql`
    query ShowsQuery($first: Int, $after: String, $taxonomy: String, $term: String) {
      shows(latest: true, first: $first, after: $after, taxonomy: $taxonomy, term: $term)
        @connection(key: "shows", filter: ["taxonomy", "term"]) {
        edges {
          node {
            id
            title
            date
            artist {
              id
              name
              slug
            }
            venue {
              id
              name
              slug
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `,
  {
    options: ({ match: { params } }) => {
      const variables = { first: 100 };
      if (params.taxonomy && params.term) {
        variables.taxonomy = params.taxonomy;
        variables.term = params.term;
      }
      return { variables };
    },
  }
)
class Shows extends Component {
  formatDate = date => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return {
      month,
      monthName: d.toLocaleString('en-us', {
        month: 'long',
      }),
      year,
      formatted: `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}`,
    };
  };

  render() {
    const {
      data: { loading, shows },
    } = this.props;

    if (loading && !shows) {
      return <Loading />;
    }

    const years = {};
    const months = {};

    return (
      <table className={styles.tableClass}>
        <tbody>
          {shows.edges.map(({ node }) => {
            const d = this.formatDate(node.date);
            const showRow = (
              <tr key={node.id}>
                <td className={styles.dateCellClass}>{d.formatted}</td>
                <td className={styles.artistCellClass}>
                  <Link to={`/shows/artist/${node.artist.slug}`}>
                    {node.title || node.artist.name}
                  </Link>
                </td>
                <td className={styles.venueCellClass}>
                  <Link to={`/shows/venue/${node.venue.slug}`}>{node.venue.name}</Link>
                </td>
              </tr>
            );

            if (!years[d.year]) {
              years[d.year] = 1;
              months[`${d.year}${d.month}`] = 1;
              return (
                <Fragment key={`${d.year}${d.month}`}>
                  <tr>
                    <td colSpan={3} className={styles.yearCellClass}>
                      {d.year}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className={styles.monthCellClass}>
                      {d.monthName}
                    </td>
                  </tr>
                  {showRow}
                </Fragment>
              );
            }
            if (!months[`${d.year}${d.month}`]) {
              months[`${d.year}${d.month}`] = 1;
              return (
                <Fragment key={`${d.year}${d.month}`}>
                  <tr>
                    <td colSpan={3} className={styles.monthCellClass}>
                      {d.monthName}
                    </td>
                  </tr>
                  {showRow}
                </Fragment>
              );
            }
            return showRow;
          })}
        </tbody>
      </table>
    );
  }
}

export default Shows;
