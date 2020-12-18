import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { headingClass, showsClass, showClass, timeClass } from './styled';

const sidebarQuery = gql`
  query SidebarQuery($first: Int!) {
    shows(latest: true, first: $first) @cache(key: "sidebar") {
      edges {
        node {
          id
          title
          artist {
            id
            name
          }
          venue {
            id
            name
          }
          date
        }
      }
    }
  }
`;

function Sidebar() {
  const { loading, data } = useQuery(sidebarQuery, {
    variables: {
      first: 15,
    },
  });

  if (loading || !data) {
    return null;
  }

  const { shows } = data;

  return (
    <aside>
      <h2 className={headingClass}>Upcoming Shows</h2>
      <div className={showsClass}>
        {shows.edges.length === 0 && (
          <div className={showClass}>
            No recommended shows at this time. Please check back soon.
          </div>
        )}
        {shows.edges.map(({ node }) => {
          const d = new Date(node.date);
          const m = d.getMonth() + 1;
          const day = d.getDate();
          return (
            <div className={showClass} key={node.id}>
              <time className={timeClass}>{`${m < 10 ? `0${m}` : m}/${
                day < 10 ? `0${day}` : day
              }/${d.getFullYear()}`}</time>
              {node.title || node.artist.name}
              <br />
              {node.venue.name}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
