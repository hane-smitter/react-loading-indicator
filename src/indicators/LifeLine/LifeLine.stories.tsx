import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LifeLine from "./LifeLine";

export default {
	title: "rli/LifeLine",
	component: LifeLine
} as ComponentMeta<typeof LifeLine>;

const Template: ComponentStory<typeof LifeLine> = args => (
	<LifeLine {...args} />
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
