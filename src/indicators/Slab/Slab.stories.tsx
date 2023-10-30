import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Slab from "./Slab";

export default {
	title: "rli/Slab",
	component: Slab
} as ComponentMeta<typeof Slab>;

const Template: ComponentStory<typeof Slab> = args => <Slab {...args} />;

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
