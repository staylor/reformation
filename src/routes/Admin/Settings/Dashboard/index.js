import React from 'react';
import { FormWrap } from 'routes/Admin/styled';
import Form from 'routes/Admin/Settings/Form';
import DashboardSettingsQuery from './DashboardSettingsQuery.graphql';
import DashboardSettingsMutation from './DashboardSettingsMutation.graphql';

const settingsFields = [
  { label: 'Google Analytics Client ID', prop: 'googleClientId', editable: true },
  { label: 'Google Analytics Tracking ID', prop: 'googleTrackingId', editable: true },
];

function DashboardSettings() {
  return (
    <FormWrap>
      <Form
        id="dashboard"
        title="Dashboard Settings"
        settingsFields={settingsFields}
        query={DashboardSettingsQuery}
        mutation={DashboardSettingsMutation}
      />
    </FormWrap>
  );
}

export default DashboardSettings;
