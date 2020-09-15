import React from 'react';

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

export default function ShowsList({ shows }) {
  const years = {};
  const months = {};

  return (
    <pre>
      {shows.edges.map(({ node }) => {
        const d = formatDate(node.date);

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
