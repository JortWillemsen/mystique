import React from 'react';

import { addons, types } from '@storybook/addons';
import { useParameter } from '@storybook/api';

import { AddonPanel } from '@storybook/components';

const ADDON_ID = 'storybook/addon-design-matcher';
const PANEL_ID = `${ADDON_ID}/panel`;

// give a unique name for the panel
const DesignMatcherContainer = () => {
  const value = useParameter("design", null);
  const item = value ? value.data : "No figma file found";

  return <div>This component has a figma file url: {item.url}</div>;
}

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Matcher for design',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <DesignMatcherContainer />
      </AddonPanel>
    ),
  });
});