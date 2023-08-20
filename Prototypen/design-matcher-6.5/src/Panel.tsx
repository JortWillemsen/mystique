import React from "react";
import { useAddonState, useChannel } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS } from "./constants";
import { PanelContent } from "./components/PanelContent";
import { useParameter } from '@storybook/api';

interface PanelProps {W
  active: boolean;
}

export const Panel = (props: PanelProps) => {  

  const param = useParameter("design", null);

  return (
    <AddonPanel {...props}>
    </AddonPanel>
  );
};
