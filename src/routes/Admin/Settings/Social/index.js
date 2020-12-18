import React from 'react';
import { FormWrap } from 'routes/Admin/styled';
import Form from 'routes/Admin/Settings/Form';
import SocialSettingsQuery from './SocialSettingsQuery.graphql';
import SocialSettingsMutation from './SocialSettingsMutation.graphql';

const settingsFields = [
  { label: 'YouTube Pathname', prop: 'youtubeUsername', editable: true },
  { label: 'Twitter Username', prop: 'twitterUsername', editable: true },
  { label: 'Instagram Username', prop: 'instagramUsername', editable: true },
  {
    label: 'Facebook Page URL',
    inputType: 'url',
    prop: 'facebookUrl',
    editable: true,
  },
  {
    label: 'Facebook App ID',
    prop: 'facebookAppId',
    editable: true,
  },
];

function SocialSettings() {
  return (
    <FormWrap>
      <Form
        id="social"
        title="Social Settings"
        settingsFields={settingsFields}
        query={SocialSettingsQuery}
        mutation={SocialSettingsMutation}
      />
    </FormWrap>
  );
}

export default SocialSettings;
