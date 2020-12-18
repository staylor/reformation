import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { headingClass, showClass, timeClass } from './styled';

function Sidebar() {
  const { loading, data } = useQuery(
    gql`
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
    `,
    {
      variables: {
        first: 15,
      },
    }
  );

  if (loading || !data) {
    return null;
  }

  return (
    <aside>
      <h2 className={headingClass}>Upcoming Shows</h2>
      {data.shows.edges.map(({ node }) => {
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
    </aside>
  );
}

export default Sidebar;
