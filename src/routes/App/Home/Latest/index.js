import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { uploadUrl } from 'utils/media';
import * as styles from './styled';

const latestQuery = gql`
  query LatestPostsQuery {
    posts(first: 5, status: PUBLISH) @cache(key: "latest") {
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
`;

function Latest() {
  const { loading, data } = useQuery(latestQuery);

  if (loading && !data) {
    return null;
  }

  return (
    <div className={styles.wrapClass}>
      {data.posts.edges.map(({ node }) => (
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

export default Latest;
