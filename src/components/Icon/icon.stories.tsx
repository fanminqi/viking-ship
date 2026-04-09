import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Icon from "./icon";
import Button from "../Button/button";

const meta = {
  title: "Icon 组件",
  component: Icon,
  tags: ["autodocs"],
  args: {
    icon: "check",
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `支持框架主题，根据主题显示不同的颜色。

\`\`\`javascript
import { Icon } from 'vikingship'
\`\`\`

**theme** 可选：\`success\` | \`danger\` | \`warning\` | \`info\` | \`primary\` | \`secondary\` | \`light\` | \`dark\``,
      },
    },
  },
  argTypes: {
    icon: {
      control: { type: "text" },
    },
    theme: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "light",
        "dark",
      ],
    },
    spin: {
      control: { type: "boolean" },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "lg", "1x", "2x", "3x"],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultIcon: Story = {
  name: "默认图标",
  args: {},
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div>
      <Icon icon="check" />
      <Icon icon="times" />
      <Icon icon="anchor" />
      <Icon icon="trash" />
      <Button btnType="primary">
        <Icon icon="check" style={{ marginRight: 6 }} />
        check
      </Button>
    </div>
  ),
};

export const ThemedIcons: Story = {
  name: "不同主题的 Icon",
  args: {},
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Icon icon="check" theme="success" />
      <Icon icon="times" theme="danger" />
      <Icon icon="anchor" theme="primary" />
      <Icon icon="exclamation-circle" theme="warning" />
    </div>
  ),
};

export const MoreBehaviors: Story = {
  name: "更多行为的 Icon",
  args: {},
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <Icon icon="spinner" theme="primary" spin />
      <Icon icon="spinner" theme="success" spin />
    </div>
  ),
};
