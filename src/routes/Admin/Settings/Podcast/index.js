import React from 'react';
import { compose, graphql } from 'react-apollo';
import { FormWrap } from 'routes/Admin/styled';
import Form from 'routes/Admin/Settings/Form';
import FeaturedMedia from 'components/Form/FeaturedMedia';
import PodcastSettingsQuery from './PodcastSettingsQuery.graphql';
import PodcastSettingsMutation from './PodcastSettingsMutation.graphql';

/* eslint-disable react/prop-types,react/no-multi-comp */

const settingsFields = [
  { label: 'Podcast Title', prop: 'title', editable: true },
  { label: 'Description', prop: 'description', type: 'textarea', editable: true },
  { label: 'Managing Editor', inputType: 'url', prop: 'managingEditor', editable: true },
  {
    label: 'Copyright Text',
    prop: 'copyrightText',
    editable: true,
  },
  {
    label: 'Website Link',
    prop: 'websiteLink',
    editable: true,
  },
  {
    label: 'Feed Link',
    prop: 'feedLink',
    editable: true,
  },
  {
    label: 'iTunes Name',
    prop: 'itunesName',
    editable: true,
  },
  {
    label: 'iTunes Email',
    prop: 'itunesEmail',
    editable: true,
  },
  {
    label: 'Generator',
    prop: 'generator',
    editable: true,
  },
  {
    label: 'Language',
    prop: 'language',
    editable: true,
  },
  {
    label: 'Explicit',
    prop: 'explicit',
    editable: true,
  },
  {
    label: 'Category',
    prop: 'category',
    editable: true,
  },
  settings => {
    let featuredMedia = settings.image && settings.image.id;
    const onChange = value => {
      [featuredMedia] = value;
    };
    return {
      label: 'Image',
      prop: 'image',
      type: 'custom',
      editable: true,
      value: () => featuredMedia,
      render: p => (
        <FeaturedMedia
          type="image"
          buttonText="Set Podcast Image"
          onChange={onChange}
          media={p ? [p.image] : []}
        />
      ),
    };
  },
];

function PodcastSettings({ data, mutate }) {
  return (
    <FormWrap>
      <Form
        id="podcast"
        title="Podcast Settings"
        settingsFields={settingsFields}
        data={data}
        mutate={mutate}
      />
    </FormWrap>
  );
}

const composed = compose(
  graphql(PodcastSettingsQuery, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),
  graphql(PodcastSettingsMutation)
);

export default composed(PodcastSettings);
