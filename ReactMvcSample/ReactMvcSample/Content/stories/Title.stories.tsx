import React from "react";

import Button, { ButtonProps } from "../components/button/button.tsx";
import Title, {TitleProps} from "../components/title/title";

export default {
  title: "Application Title",
  component: Title
};

const Template = (args: TitleProps) => <Title {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "Hello World",
};
