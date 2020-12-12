import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { cx } from 'pretty-lights';
import Loading from 'components/Loading';
import NotFound from 'components/NotFound';
import * as styles from './styled';
import NavMenu from './NavMenu';
import routeConfig from './routeConfig';

/* eslint-disable react/prop-types */

class Admin extends Component {
  state = {
    collapsed: false,
  };

  toggleCollapse = () => {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  };

  render() {
    const {
      data: { loading, settings, taxonomies },
    } = this.props;

    if (loading && !settings) {
      return <Loading />;
    }

    const routes = routeConfig({
      taxonomies: taxonomies.edges.map(({ node }) => node),
    });

    const isCollapsed = this.state.collapsed;

    return (
      <div className={styles.wrapperClass}>
        <Helmet defaultTitle={settings.siteTitle} titleTemplate={`%s » ${settings.siteTitle}`}>
          <html lang={settings.language} />
          <title>Admin</title>
        </Helmet>
        <section>
          <div id="portal" />
          <div className={styles.atomicToolbarClass} id="atomicToolbar" />
          <NavMenu
            toggleCollapse={this.toggleCollapse}
            isCollapsed={isCollapsed}
            routeConfig={routes}
          />
          <section
            className={cx(styles.contentClass, {
              [styles.openContentClass]: !isCollapsed,
              [styles.collapsedContentClass]: isCollapsed,
            })}
          >
            <Switch>
              {routes.map(section =>
                section.map(route => (
                  <Route
                    key={route.label}
                    exact={route.path === '/'}
                    path={route.path}
                    component={route.component}
                  />
                ))
              )}
              <Route path="*" component={NotFound} />
            </Switch>
          </section>
        </section>
      </div>
    );
  }
}

export default graphql(
  gql`
    query AdminQuery {
      settings(id: "site") {
        ... on SiteSettings {
          siteTitle
          siteUrl
          language
        }
      }
      taxonomies @connection(key: "taxonomies") {
        edges {
          node {
            id
            name
            plural
            slug
          }
        }
      }
    }
  `
)(Admin);
