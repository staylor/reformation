import React from 'react';
import { Helmet } from 'react-helmet-async';
import { gql, useQuery } from '@apollo/client';
import NotFound from 'components/NotFound';
import Loading from 'components/Loading';
import AppContext from 'routes/App/Context';
import { uploadUrl } from 'utils/media';
import AppleLogo from './Apple';
import SpotifyLogo from './Spotify';
import * as styles from './styled';

const podcastsQuery = gql`
  query PodcastsQuery($first: Int) {
    settings(id: "podcast") {
      ... on PodcastSettings {
        title
        description
        websiteLink
        feedLink
        image {
          id
          destination
          fileName
        }
      }
    }
    podcasts(first: $first) {
      edges {
        node {
          id
          title
          description
        }
      }
    }
  }
`;

function PodcastsRoute() {
  const { loading, error, data } = useQuery(podcastsQuery, {
    variables: { first: 10 },
  });

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <NotFound />;
  }

  const { podcasts, settings } = data;

  return (
    <AppContext.Consumer>
      {({ socialSettings }) => {
        const { twitterUsername } = socialSettings;

        const { title, description: summary, websiteLink: podcastUrl, image } = settings;

        const featuredImage = uploadUrl(image.destination, image.fileName);

        return (
          <article className={styles.wrapperClass}>
            <Helmet>
              <title>Podcast: {title}</title>
              <link rel="canonical" href={podcastUrl} />
              <link
                rel="alternate"
                type="application/rss+xml"
                href={settings.feedLink}
                title={title}
              />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={title} />
              <meta property="og:description" content={summary} />
              <meta property="og:url" content={podcastUrl} />
              <meta property="og:image" content={featuredImage} />
              <meta name="twitter:card" value="summary" />
              {twitterUsername && <meta name="twitter:site" value={`@${twitterUsername}`} />}
              {twitterUsername && <meta name="twitter:creator" value={`@${twitterUsername}`} />}
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={summary} />
              <meta name="twitter:url" content={podcastUrl} />
              {featuredImage && <meta name="twitter:image" content={featuredImage} />}
            </Helmet>
            <h1 className={styles.titleClass}>Podcast: {title}</h1>
            <p className={styles.textClass}>{summary}</p>
            {podcasts.edges.map(({ node }) => (
              <figure className={styles.figureClass} key={node.id}>
                <figcaption className={styles.figcaptionClass}>
                  <a href={`/podcast/${node.id}`} className={styles.linkClass}>
                    {node.title}
                  </a>
                  <p>{node.description}</p>
                </figcaption>
              </figure>
            ))}
            <footer className={styles.footerClass}>
              <a
                href="https://podcasts.apple.com/us/podcast/high-for-this/id1461883255"
                className={styles.logoClass}
              >
                <AppleLogo className={styles.appleClass} />
              </a>
              <a
                href="https://open.spotify.com/show/7FDueRQTovjtNdcqEzfGgV"
                className={styles.logoClass}
              >
                <SpotifyLogo className={styles.spotifyClass} />
              </a>
            </footer>
          </article>
        );
      }}
    </AppContext.Consumer>
  );
}

export default PodcastsRoute;
