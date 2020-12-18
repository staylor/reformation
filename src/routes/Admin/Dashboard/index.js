import React from 'react';
import { useQuery } from '@apollo/client';
import DashboardSettingsQuery from '../Settings/Dashboard/DashboardSettingsQuery.graphql';
import Analytics from './Analytics';
import Page from '../Page';

function Dashboard() {
  const query = useQuery(DashboardSettingsQuery);

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
