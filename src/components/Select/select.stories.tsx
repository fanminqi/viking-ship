import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import Select from "./index";

const meta = {
  title: "Select",
  id: "Select",
  component: Select,
  tags: ["autodocs"],
  subcomponents: { Option: Select.Option },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `下拉选择器。\n\n\`\`\`javascript\nimport { Select } from 'vikingship'\n// 然后可以使用 <Select> 和 <Select.Option>\n\`\`\`\n`,
      },
    },
  },
  args: {
    defaultValue: "",
    placeholder: "请选择",
    disabled: false,
    multiple: false,
    onChange: fn(),
    onVisibleChange: fn(),
  },
  argTypes: {
    defaultValue: {
      control: { type: "text" },
    },
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    name: {
      control: { type: "text" },
    },
    onChange: {
      control: false,
      table: { disable: true },
    },
    onVisibleChange: {
      control: false,
      table: { disable: true },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ADefaultSelect: Story = {
  name: "默认的Select",
  args: {
    placeholder: "请选择",
    multiple: false,
    disabled: false,
    defaultValue: "",
  },
  render: (args) => (
    <Select {...args}>
      <Select.Option value="nihao" />
      <Select.Option value="nihao2" />
      <Select.Option value="nihao3" />
      <Select.Option value="disabled" disabled />
      <Select.Option value="nihao5" />
    </Select>
  ),
};

export const BMultipleSelect: Story = {
  name: "支持多选的 Select",
  args: {
    placeholder: "支持多选欧！",
    multiple: true,
    disabled: false,
    defaultValue: [],
  },
  render: (args) => (
    <Select {...args}>
      <Select.Option value="nihao" />
      <Select.Option value="nihao2" />
      <Select.Option value="nihao3" />
      <Select.Option value="viking" />
      <Select.Option value="viking2" />
    </Select>
  ),
};

export const CDisabledSelect: Story = {
  name: "被禁用的 Select",
  args: {
    placeholder: "禁用啦！",
    disabled: true,
    multiple: false,
    defaultValue: "",
  },
  render: (args) => (
    <Select {...args}>
      <Select.Option value="nihao" />
      <Select.Option value="nihao2" />
      <Select.Option value="nihao3" />
    </Select>
  ),
};
