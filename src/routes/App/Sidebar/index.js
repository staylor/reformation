import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { headingClass, showClass, timeClass } from './styled';

/* eslint-disable react/prop-types */

@graphql(gql`
  query SidebarQuery {
    shows(latest: true, first: 20) @connection(key: "shows", filter: ["latest"]) {
      edges {
        node {
          id
          artist {
            name
          }
          venue {
            name
          }
          date
        }
      }
    }
  }
`)
class Sidebar extends Component {
  render() {
    const {
      data: { loading, shows },
    } = this.props;

    if (loading && !shows) {
      return null;
    }

    return (
      <aside>
        <h2 className={headingClass}>Upcoming Shows</h2>
        {shows.edges.map(({ node }) => {
          const d = new Date(node.date);
          const m = d.getMonth() + 1;
          const day = d.getDate();
          return (
            <div className={showClass} key={node.id}>
              <time className={timeClass}>{`${m < 10 ? `0${m}` : m}/${
                day < 10 ? `0${day}` : day
              }/${d.getFullYear()}`}</time>
              {node.artist.name}
              <br />
              {node.venue.name}
            </div>
          );
        })}
      </aside>
    );
  }
}

export default Sidebar;
