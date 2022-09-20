import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CircularProgress } from "./CircularProgress";

export default {
  title: "rli/CircularProgress",
  component: CircularProgress,
} as ComponentMeta<typeof CircularProgress>;

const Template: ComponentStory<typeof CircularProgress> = (args) => (
  <CircularProgress {...args} />
);

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  color: "#b7ac9a",
  text: true,
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
