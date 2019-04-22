import React from 'react';

/* eslint-disable react/prop-types */

export default function ShowsList({ shows }) {
  const years = {};
  const months = {};

  return (
    <pre>
      {shows.edges.map(({ node }) => {
        const d = this.formatDate(node.date);

        const showRow = `${d.formatted} ${node.title || node.artist.name} - ${node.venue.name}\n`;

        if (!years[d.year]) {
          years[d.year] = 1;
          months[`${d.year}${d.month}`] = 1;
          return `\n${d.year}\n\n${d.monthName}\n${showRow}`;
        }
        if (!months[`${d.year}${d.month}`]) {
          months[`${d.year}${d.month}`] = 1;
          return `\n${d.monthName}\n${showRow}`;
        }
        return `${showRow}`;
      })}
    </pre>
  );
}
