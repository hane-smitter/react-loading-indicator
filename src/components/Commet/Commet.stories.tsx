import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Commet } from "./Commet";

export default {
  title: "rli/Commet",
  component: Commet,
} as ComponentMeta<typeof Commet>;

const Template: ComponentStory<typeof Commet> = (args) => <Commet {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  disabled: false,
  text: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  disabled: false,
  text: "Secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  primary: false,
  disabled: true,
  text: "Disabled",
};

export const Small = Template.bind({});
Small.args = {
  primary: true,
  disabled: false,
  size: "small",
  text: "Small",
};

export const Medium = Template.bind({});
Medium.args = {
  primary: true,
  disabled: false,
  size: "medium",
  text: "Medium",
};

export const Large = Template.bind({});
Large.args = {
  primary: true,
  disabled: false,
  size: "large",
  text: "Large",
};
