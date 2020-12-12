import React from 'react';
import { FormWrap } from 'routes/Admin/styled';
import Form from 'routes/Admin/Settings/Form';
import SiteSettingsQuery from './SiteSettingsQuery.graphql';
import SiteSettingsMutation from './SiteSettingsMutation.graphql';

const settingsFields = [
  { label: 'Site Title', prop: 'siteTitle', editable: true },
  { label: 'Tagline', prop: 'tagline', editable: true },
  { label: 'Site URL', inputType: 'url', prop: 'siteUrl', editable: true },
  {
    label: 'Email Address',
    inputType: 'email',
    prop: 'emailAddress',
    editable: true,
  },
  {
    label: 'Site Language',
    prop: 'language',
    editable: true,
    type: 'select',
    choices: [{ value: 'en-US', label: 'English (United States)' }],
  },
  {
    label: 'Copyright Text',
    prop: 'copyrightText',
    editable: true,
    type: 'textarea',
  },
];

function SiteSettings() {
  return (
    <FormWrap>
      <Form
        id="site"
        title="General Settings"
        settingsFields={settingsFields}
        query={SiteSettingsQuery}
        mutation={SiteSettingsMutation}
      />
    </FormWrap>
  );
}

export default SiteSettings;
