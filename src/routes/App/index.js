import React, { Component, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { cx } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import Helmet from 'react-helmet-async';
import NotFound from 'components/NotFound';
import Logo from 'components/Logo';
import Home from './Home';
import Videos from './Videos';
import Video from './Video';
import Post from './Post';
import Sidebar from './Sidebar';
import Navigation from './Nav';
import AppContext from './Context';
import Mailchimp from './Mailchimp';
import * as styles from './styled';

/* eslint-disable react/prop-types */

@graphql(
  gql`
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
        }
      }
    }
  `
)
class App extends Component {
  componentDidUpdate() {
    document.documentElement.scrollTop = 0;
  }

  render() {
    const {
      data: { loading, settings, socialSettings, dashboardSettings },
    } = this.props;

    if (loading && !settings) {
      return null;
    }

    const social = (
      <Fragment>
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
          <a
            className={cx('icon-font', styles.facebookIconClass)}
            href={socialSettings.facebookUrl}
          >
            <span>Facebook</span>
          </a>
        )}
      </Fragment>
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
                  src={`https://www.googletagmanager.com/gtag/js?id=${
                    dashboardSettings.googleTrackingId
                  }`}
                />
              )}
              {dashboardSettings.googleTrackingId && (
                <script>{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${
                  dashboardSettings.googleTrackingId
                }');`}</script>
              )}
              <link rel="canonical" href={settings.siteUrl} />
              {socialSettings.facebookAppId && (
                <meta property="fb:app_id" content={socialSettings.facebookAppId} />
              )}
              <meta property="og:site_name" content={settings.siteTitle} />
            </Helmet>
            <header className={styles.headerClass}>
              <h1 className={styles.titleClass}>
                <Link to="/">
                  <Logo />
                </Link>
              </h1>
              <nav className={styles.socialNavClass}>{social}</nav>
              <Navigation />
            </header>
            <div className={styles.contentClass}>
              <section className={styles.primaryClass}>
                <Switch>
                  <Route exact path="/videos/:year(\d{4})?" component={Videos} />
                  <Route path="/video/:slug" component={Video} />
                  <Route path="/post/:slug" component={Post} />
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
              <section
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: settings.copyrightText }}
              />
            </footer>
          </div>
        </ThemeProvider>
      </AppContext.Provider>
    );
  }
}

export default App;
