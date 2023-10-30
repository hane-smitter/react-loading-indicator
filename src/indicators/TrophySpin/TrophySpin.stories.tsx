import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TrophySpin from "./TrophySpin";

export default {
	title: "rli/TrophySpin",
	component: TrophySpin
} as ComponentMeta<typeof TrophySpin>;

const Template: ComponentStory<typeof TrophySpin> = args => (
	<TrophySpin {...args} />
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
