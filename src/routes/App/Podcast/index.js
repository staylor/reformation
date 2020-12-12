import React from 'react';
import { Helmet } from 'react-helmet-async';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import NotFound from 'components/NotFound';
import Loading from 'components/Loading';
import AppContext from 'routes/App/Context';
import { uploadUrl } from 'utils/media';
import AppleLogo from './Apple';
import SpotifyLogo from './Spotify';
import * as styles from './styled';

/* eslint-disable react/prop-types */

function PodcastRoute() {
  const params = useParams();
  const { loading, error, data } = useQuery(
    gql`
      query PodcastQuery($id: ObjID!) {
        settings(id: "podcast") {
          ... on PodcastSettings {
            title
            description
            feedLink
            image {
              id
              destination
              fileName
            }
          }
        }
        podcast(id: $id) {
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
    `,
    {
      variables: { id: params.id },
    }
  );

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <NotFound />;
  }

  const { podcast, settings } = data;

  return (
    <AppContext.Consumer>
      {({ socialSettings, settings: siteSettings }) => {
        const { siteUrl } = siteSettings;
        const { twitterUsername } = socialSettings;

        const podcastUrl = `${siteUrl}/podcast/${podcast.id}`;
        const featuredImage = uploadUrl(settings.image.destination, settings.image.fileName);

        return (
          <article className={styles.wrapperClass}>
            <Helmet>
              <title>{podcast.title}</title>
              <link rel="canonical" href={podcastUrl} />
              <link
                rel="alternate"
                type="application/rss+xml"
                href={settings.feedLink}
                title={settings.title}
              />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={podcast.title} />
              <meta property="og:description" content={podcast.description} />
              <meta property="og:url" content={podcastUrl} />
              <meta property="og:image" content={featuredImage} />
              <meta name="twitter:card" value="summary" />
              {twitterUsername && <meta name="twitter:site" value={`@${twitterUsername}`} />}
              {twitterUsername && <meta name="twitter:creator" value={`@${twitterUsername}`} />}
              <meta name="twitter:title" content={podcast.title} />
              <meta name="twitter:description" content={podcast.description} />
              <meta name="twitter:url" content={podcastUrl} />
              {featuredImage && <meta name="twitter:image" content={featuredImage} />}
            </Helmet>
            <h1 className={styles.titleClass}>{podcast.title}</h1>
            <p className={styles.textClass}>{podcast.description}</p>
            <figure className={styles.figureClass} key={podcast.id}>
              <audio // eslint-disable-line
                src={uploadUrl(podcast.audio.destination, podcast.audio.fileName)}
                controls
              />
            </figure>
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

export default PodcastRoute;
