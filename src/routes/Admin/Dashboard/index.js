import React from 'react';
import { useQuery } from '@apollo/client';
import Loading from 'components/Loading';
import DashboardSettingsQuery from '../Settings/Dashboard/DashboardSettingsQuery.graphql';
import Analytics from './Analytics';
import { Heading } from '../styled';

function Dashboard() {
  const { loading, data } = useQuery(DashboardSettingsQuery);

  if (loading && !data) {
    return (
      <>
        <Heading>Dashboard</Heading>
        <Loading />
      </>
    );
  }

  const { settings } = data;

  return (
    <>
      <Heading>Dashboard</Heading>

      {settings.googleClientId ? (
        <Analytics googleClientId={settings.googleClientId} />
      ) : (
        'You need a Google Client ID to view analytics.'
      )}
    </>
  );
}

export default Dashboard;
