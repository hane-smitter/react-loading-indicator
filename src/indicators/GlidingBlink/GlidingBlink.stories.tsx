import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import GlidingBlink from "./GlidingBlink";

export default {
	title: "rli/GlidingBlink",
	component: GlidingBlink
} as ComponentMeta<typeof GlidingBlink>;

const Template: ComponentStory<typeof GlidingBlink> = args => (
	<GlidingBlink {...args} />
);

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
	color: "#b7ac9a",
	text: true
};

export const Small = Template.bind({});
Small.args = {
	size: "small"
};

export const Medium = Template.bind({});
Medium.args = {
	size: "medium"
};

export const Large = Template.bind({});
Large.args = {
	size: "large"
};
