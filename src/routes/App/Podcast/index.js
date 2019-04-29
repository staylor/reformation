import React from 'react';
import Helmet from 'react-helmet-async';
import AppContext from 'routes/App/Context';
import { Wrapper, Title } from './styled';

/* eslint-disable react/prop-types */

function PodcastRoute() {
  return (
    <AppContext.Consumer>
      {({ settings, socialSettings }) => {
        const { twitterUsername } = socialSettings;

        const title = 'High for This: Podcast';
        const summary =
          'The latest albums you need to hear. Suggested concerts, and how to navigate the live music scene in New York City. Hosted by Scott Taylor, with guests. Weekly.';
        const podcastUrl = `${settings.siteUrl}/podcast`;
        const featuredImage =
          'https://storage.googleapis.com/wonderboymusic/HighForThis300x300.jpg';

        return (
          <Wrapper>
            <Helmet>
              <title>Podcast</title>
              <link rel="canonical" href={podcastUrl} />
              <link
                rel="alternate"
                type="application/rss+xml"
                href="https://storage.googleapis.com/wonderboymusic/podcast/HighForThis.xml"
                title="High for This"
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
            <Title>{title}</Title>
            <p>{summary}</p>
            <a href="https://storage.googleapis.com/wonderboymusic/4_29_Podcast.mp3">
              Latest Episode
            </a>
          </Wrapper>
        );
      }}
    </AppContext.Consumer>
  );
}

export default PodcastRoute;
