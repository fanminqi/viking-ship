import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./input";

const ControlledInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="controlled input"
    />
  );
};

const meta = {
  title: "Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    size: {
      control: { type: "radio" },
      options: ["lg", "sm"],
    },
    icon: {
      control: { type: "object" },
    },
    prepend: {
      control: { type: "text" },
    },
    append: {
      control: { type: "text" },
    },
    onChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DisabledInput: Story = {
  name: "被禁用的 Input",
  args: {
    placeholder: "我的Input组件",
    disabled: true,
    size: "lg",
    icon: undefined,
    prepend: "",
    append: "",
  },
  render: (args) => <Input {...args} />,
};

export const Controlled: Story = {
  name: "受控的 Input",
  args: {},
  parameters: {
    controls: { disable: true },
  },
  render: () => <ControlledInput />,
};

export const WithIcon: Story = {
  name: "带图标的 Input",
  args: {
    placeholder: "input with icon",
    disabled: false,
    size: "lg",
    icon: faMagnifyingGlass,
    prepend: "",
    append: "",
  },
  render: (args) => <Input {...args} />,
};

export const DifferentSizes: Story = {
  name: "大小不同的 Input",
  args: {},
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <>
      <Input placeholder="large size" size="lg" />
      <Input placeholder="small size" size="sm" />
    </>
  ),
};

export const WithPrependAppend: Story = {
  name: "带前后缀的 Input",
  args: {},
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <Input placeholder="prepend text" prepend="https://" append=".com" />
  ),
};
