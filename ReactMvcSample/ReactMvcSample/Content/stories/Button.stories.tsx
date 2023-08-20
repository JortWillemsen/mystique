import React from "react";

import Button, { ButtonProps } from "../components/button/button.tsx";

export default {
  title: "Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/mRwtRs6BSTh0xvqSukmPKF/button_red?node-id=1%3A5&t=nV9DaIgfYdZvItc3-1",
    },
  }
};

const Template = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "Hello World",
};
