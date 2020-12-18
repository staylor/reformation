import React from 'react';
import Page from 'routes/Admin/Page';
import { useAdminQuery } from 'routes/Admin/utils';
import DashboardSettingsQuery from '../Settings/Dashboard/DashboardSettingsQuery.graphql';
import Analytics from './Analytics';

function Dashboard() {
  const query = useAdminQuery(DashboardSettingsQuery);

  return (
    <Page query={query} title="Dashboard">
      {({ settings }) =>
        settings.googleClientId ? (
          <Analytics googleClientId={settings.googleClientId} />
        ) : (
          'You need a Google Client ID to view analytics.'
        )
      }
    </Page>
  );
}

export default Dashboard;
