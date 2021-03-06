import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { gql } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { cx } from 'pretty-lights';
import NotFound from 'components/NotFound';
import { useAdminQuery } from 'routes/Admin/utils';
import * as styles from './styled';
import NavMenu from './NavMenu';
import routeConfig from './routeConfig';

const adminQuery = gql`
  query AdminQuery {
    settings(id: "site") {
      ... on SiteSettings {
        siteTitle
        siteUrl
        language
      }
    }
    taxonomies @cache(key: "admin") {
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
`;

function Admin() {
  const [isCollapsed, setCollapsed] = useState(false);
  const { loading, data } = useAdminQuery(adminQuery);

  if (loading && !data) {
    return null;
  }

  const { settings, taxonomies } = data;

  const routes = routeConfig({
    taxonomies: taxonomies.edges.map(({ node }) => node),
  });

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
          toggleCollapse={() => setCollapsed(!isCollapsed)}
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

export default Admin;
