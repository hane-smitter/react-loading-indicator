import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Atom } from "./Atom";

export default {
  title: "rli/Atom",
  component: Atom,
} as ComponentMeta<typeof Atom>;

const Template: ComponentStory<typeof Atom> = (args) => <Atom {...args} />;

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  color: "#b7ac9a",
  text: true
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
};
