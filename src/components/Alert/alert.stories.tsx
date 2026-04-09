import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import Alert from "./alert";

const meta = {
  title: "Alert 组件",
  id: "Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    onClose: fn(),
  },
  argTypes: {
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    type: {
      control: { type: "select" },
      options: ["default", "success", "danger", "warning"],
    },
    closable: {
      control: { type: "boolean" },
    },
    onClose: {
      control: false,
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ADefaultAlert: Story = {
  name: "基本样式",
  args: {
    title: "this is alert!",
  },
  render: (args) => <Alert {...args} />,
};

export const CDescAlert: Story = {
  name: "带描述的 Alert",
  args: {
    title: "提示标题欧亲",
    description: "this is a long description",
  },
  render: (args) => <Alert {...args} />,
};

export const BStylesAlert: Story = {
  name: "不同样式的 Alert",
  args: {
    title: "",
    onClose: fn(),
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <>
      <Alert title="this is Success" type="success" />
      <Alert title="this is Danger!" type="danger" />
      <Alert title="this is Warning!" type="warning" closable={false} />
    </>
  ),
};
