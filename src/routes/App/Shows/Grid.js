import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import * as styles from './styled';

/* eslint-disable react/prop-types */

const formatDate = date => {
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

export default function ShowsGrid({ shows }) {
  if (!shows || !shows.edges || shows.edges.length === 0) {
    return <p>No recommended shows at this time.</p>;
  }

  const years = {};
  const months = {};

  return (
    <table className={styles.tableClass}>
      <tbody>
        {shows.edges.map(({ node }) => {
          const d = formatDate(node.date);
          const showRow = (
            <tr key={node.id}>
              <td className={styles.dateCellClass}>{d.formatted}</td>
              <td className={styles.artistCellClass}>
                <Link to={`/artist/${node.artist.slug}`}>{node.title || node.artist.name}</Link>
              </td>
              <td className={styles.venueCellClass}>
                <Link to={`/venue/${node.venue.slug}`}>{node.venue.name}</Link>
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

ShowsGrid.fragments = {
  shows: gql`
    fragment ShowsGrid_shows on ShowConnection {
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
  `,
};
