import React, { useEffect } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { cx, ThemeProvider } from 'pretty-lights';
import { Helmet } from 'react-helmet-async';
import dynamic from 'kyt-runtime/dynamic';
import NotFound from 'components/NotFound';
import Sidebar from './Sidebar';
import Navigation from './Nav';
import AppContext from './Context';
import Mailchimp from './Mailchimp';
import * as styles from './styled';

const Home = dynamic(() => import(/* webpackChunkName: "home" */ 'routes/App/Home'));
const Shows = dynamic(() => import(/* webpackChunkName: "shows" */ 'routes/App/Shows'));
const Artist = dynamic(() => import(/* webpackChunkName: "venue" */ 'routes/App/Artist'));
const Venue = dynamic(() => import(/* webpackChunkName: "venue" */ 'routes/App/Venue'));
const Videos = dynamic(() => import(/* webpackChunkName: "videos" */ 'routes/App/Videos'));
const Video = dynamic(() => import(/* webpackChunkName: "video" */ 'routes/App/Video'));
const Post = dynamic(() => import(/* webpackChunkName: "post" */ 'routes/App/Post'));
const PodcastList = dynamic(() =>
  import(/* webpackChunkName: "podcasts" */ 'routes/App/Podcast/List')
);
const Podcast = dynamic(() => import(/* webpackChunkName: "podcast" */ 'routes/App/Podcast'));

const appQuery = gql`
  query AppQuery {
    settings(id: "site") {
      ... on SiteSettings {
        siteTitle
        tagline
        siteUrl
        language
        copyrightText
      }
    }
    dashboardSettings: settings(id: "dashboard") {
      ... on DashboardSettings {
        googleTrackingId
      }
    }
    socialSettings: settings(id: "social") {
      ... on SocialSettings {
        facebookUrl
        facebookAppId
        twitterUsername
        instagramUsername
        youtubeUsername
      }
    }
  }
`;

function App() {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);

  const { loading, data } = useQuery(appQuery);

  if (loading && !data) {
    return null;
  }

  const { settings, socialSettings, dashboardSettings } = data;

  const social = (
    <>
      {socialSettings.youtubeUsername && (
        <a
          className={cx('icon-font', styles.youtubeIconClass)}
          href={`https://youtube.com/${socialSettings.youtubeUsername}`}
        >
          <span>YouTube</span>
        </a>
      )}
      {socialSettings.instagramUsername && (
        <a
          className={cx('icon-font', styles.instagramIconClass)}
          href={`https://instagram.com/${socialSettings.instagramUsername}`}
        >
          <span>Instagram</span>
        </a>
      )}
      {socialSettings.twitterUsername && (
        <a
          className={cx('icon-font', styles.twitterIconClass)}
          href={`https://twitter.com/${socialSettings.twitterUsername}`}
        >
          <span>Twitter</span>
        </a>
      )}
      {socialSettings.facebookUrl && (
        <a className={cx('icon-font', styles.facebookIconClass)} href={socialSettings.facebookUrl}>
          <span>Facebook</span>
        </a>
      )}
    </>
  );

  return (
    <AppContext.Provider value={{ settings, socialSettings }}>
      <ThemeProvider theme={{}}>
        <div className={styles.wrapperClass}>
          <Helmet defaultTitle={settings.siteTitle} titleTemplate={`%s » ${settings.siteTitle}`}>
            <html lang={settings.language} />
            <title>{settings.tagline}</title>
            {dashboardSettings.googleTrackingId && (
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${dashboardSettings.googleTrackingId}`}
              />
            )}
            {dashboardSettings.googleTrackingId && (
              <script>{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${dashboardSettings.googleTrackingId}');`}</script>
            )}
            <link rel="canonical" href={settings.siteUrl} />
            {socialSettings.facebookAppId && (
              <meta property="fb:app_id" content={socialSettings.facebookAppId} />
            )}
            <meta property="og:site_name" content={settings.siteTitle} />
          </Helmet>
          <header className={styles.headerClass}>
            <h1 className={styles.titleClass}>
              <Link to="/">High for This</Link>
            </h1>
            <nav className={styles.socialNavClass}>{social}</nav>
            <Navigation />
          </header>
          <div className={styles.contentClass}>
            <section className={styles.primaryClass}>
              <Switch>
                <Route exact path="/videos/:year(\d{4})?" component={Videos} />
                <Route path="/shows/:taxonomy/:term" component={Shows} />
                <Route exact path="/shows/list" component={Shows} />
                <Route exact path="/shows" component={Shows} />
                <Route exact path="/artist/:slug" component={Artist} />
                <Route exact path="/venue/:slug" component={Venue} />
                <Route path="/video/:slug" component={Video} />
                <Route path="/post/:slug" component={Post} />
                <Route path="/podcast/:id" component={Podcast} />
                <Route path="/podcast" component={PodcastList} />
                <Route exact path="/" component={Home} />
                <Route path="*" component={NotFound} />
              </Switch>
            </section>
            <section className={styles.secondaryClass}>
              <Sidebar />
            </section>
          </div>
          <nav className={styles.footerNavClass}>{social}</nav>
          <footer className={styles.footerClass}>
            <Mailchimp />
            <section dangerouslySetInnerHTML={{ __html: settings.copyrightText }} />
          </footer>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
