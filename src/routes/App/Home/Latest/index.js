import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { uploadUrl } from 'utils/media';
import { wrapClass, articleClass, titleClass, paragraphClass, imageClass } from './styled';

/* eslint-disable react/prop-types */

@graphql(gql`
  query LatestPostsQuery {
    posts(first: 4, status: PUBLISH) @connection(key: "status") {
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
    const { data: { loading, posts } } = this.props;
    if (loading && !posts) {
      return null;
    }

    return (
      <div className={wrapClass}>
        {posts.edges.map(({ node }) => (
          <article className={articleClass} key={node.id}>
            <h1 className={titleClass}>
              <Link to={`/post/${node.slug}`}>{node.title}</Link>
            </h1>
            {node.featuredMedia &&
              node.featuredMedia.map(media => {
                const crop = media.crops.find(c => c.width === 300);
                return (
                  <img
                    className={imageClass}
                    key={crop.fileName}
                    alt=""
                    src={uploadUrl(media.destination, crop.fileName)}
                  />
                );
              })}
            <p className={paragraphClass}>{node.summary}</p>
          </article>
        ))}
      </div>
    );
  }
}

export default Latest;
