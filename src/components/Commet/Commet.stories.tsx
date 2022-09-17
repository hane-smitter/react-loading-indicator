import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Commet } from "./Commet";

export default {
  title: "rli/Commet",
  component: Commet,
} as ComponentMeta<typeof Commet>;

const Template: ComponentStory<typeof Commet> = (args) => <Commet {...args} />;

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  color: ["rebeccapurple", "slateblue"],
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
