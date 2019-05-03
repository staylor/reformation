import React, { Component } from 'react';
import Helmet from 'react-helmet-async';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { cx } from 'emotion';
import NotFound from 'components/NotFound';
import Loading from 'components/Loading';
import AppContext from 'routes/App/Context';
import { uploadUrl } from 'utils/media';
import AppleLogo from './Apple';
import SpotifyLogo from './Spotify';
import * as styles from './styled';

/* eslint-disable react/prop-types */

@graphql(
  gql`
    query PodcastQuery($first: Int) {
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
            audio {
              id
              duration
              destination
              fileName
            }
          }
        }
      }
    }
  `,
  {
    options: {
      variables: { first: 10 },
    },
  }
)
class PodcastRoute extends Component {
  render() {
    const {
      data: { loading, error, podcasts, settings },
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error || !podcasts || !settings) {
      return <NotFound />;
    }

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
                  <figcaption className={cx(styles.figcaptionClass, styles.linkClass)}>
                    {node.title}
                  </figcaption>
                  <audio // eslint-disable-line
                    src={uploadUrl(node.audio.destination, node.audio.fileName)}
                    controls
                  />
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
                <a
                  href="https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&amp;isi=691797987&amp;ius=googleplaymusic&amp;apn=com.google.android.music&amp;link=https://play.google.com/music/m/Iukr2tc7jjrlfprqwtnkf7wswcy?t%3DHigh_for_This%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16"
                  rel="nofollow"
                  className={styles.logoClass}
                >
                  <img
                    className={styles.googleClass}
                    alt="Listen on Google Play Music"
                    src="https://play.google.com/intl/en_us/badges-music/images/badges/en_badge_web_music.png"
                  />
                </a>
              </footer>
            </article>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default PodcastRoute;
