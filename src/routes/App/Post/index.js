import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NotFound from 'components/NotFound';
import AppContext from 'routes/App/Context';
import { uploadUrl } from 'utils/media';
import Content from './Content';
import { wrapperClass, Title } from './styled';

function PostRoute() {
  const params = useParams();
  const { loading, error, data } = useQuery(
    gql`
      query PostQuery($slug: String) {
        post(slug: $slug) {
          id
          title
          slug
          contentState {
            ...Content_contentState
          }
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
      ${Content.fragments.contentState}
    `,
    { variables: { slug: params.slug } }
  );

  if (error) {
    return <NotFound />;
  }

  if (loading && !data) {
    return null;
  }

  const { post } = data;

  return (
    <AppContext.Consumer>
      {({ settings, socialSettings }) => {
        const { twitterUsername } = socialSettings;

        const postUrl = `${settings.siteUrl}/post/${post.slug}`;

        let featuredImage = null;
        if (post.featuredMedia && post.featuredMedia.length > 0) {
          const media = post.featuredMedia[0];
          const crop = media.crops.find(c => c.width === 640);
          featuredImage = uploadUrl(media.destination, crop.fileName);
        }

        return (
          <article className={wrapperClass}>
            <Helmet>
              <title>{post.title}</title>
              <link rel="canonical" href={postUrl} />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={post.title} />
              <meta property="og:description" content={post.summary} />
              <meta property="og:url" content={postUrl} />
              {featuredImage && <meta property="og:image" content={featuredImage} />}
              <meta name="twitter:card" value="summary_large_image" />
              {twitterUsername && <meta name="twitter:site" value={`@${twitterUsername}`} />}
              {twitterUsername && <meta name="twitter:creator" value={`@${twitterUsername}`} />}
              <meta name="twitter:title" content={post.title} />
              <meta name="twitter:description" content={post.summary} />
              <meta name="twitter:url" content={postUrl} />
              {featuredImage && <meta name="twitter:image" content={featuredImage} />}
            </Helmet>
            <Title>{post.title}</Title>
            <Content contentState={post.contentState} />
          </article>
        );
      }}
    </AppContext.Consumer>
  );
}

export default PostRoute;
