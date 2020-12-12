import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { uploadUrl } from 'utils/media';
import * as styles from './styled';

/* eslint-disable react/prop-types */

@graphql(gql`
  query LatestPostsQuery {
    posts(first: 4, status: PUBLISH) @connection(key: "latest", filter: ["status"]) {
      edges {
        node {
          id
          slug
          title
          summary
          featuredMedia {
            destination
            ... on ImageUpload {
              crops {
                fileName
                width
              }
            }
          }
        }
      }
    }
  }
`)
class Latest extends Component {
  render() {
    const {
      data: { loading, posts },
    } = this.props;
    if (loading && !posts) {
      return null;
    }

    return (
      <div className={styles.wrapClass}>
        {posts.edges.map(({ node }) => (
          <article className={styles.articleClass} key={node.id}>
            <h1 className={styles.titleClass}>
              <Link to={`/post/${node.slug}`}>{node.title}</Link>
            </h1>
            {node.featuredMedia &&
              node.featuredMedia.map(media => {
                const crop = media.crops.find(c => c.width === 300);
                return (
                  <Link to={`/post/${node.slug}`} key={crop.fileName}>
                    <img
                      className={styles.imageClass}
                      alt=""
                      src={uploadUrl(media.destination, crop.fileName)}
                    />
                  </Link>
                );
              })}
            <p className={styles.paragraphClass}>{node.summary}</p>
          </article>
        ))}
      </div>
    );
  }
}

export default Latest;
