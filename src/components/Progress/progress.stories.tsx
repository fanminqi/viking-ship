import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Progress from "./progress";
import type { ThemeProps } from "../Icon/icon";

const meta = {
  title: "Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "进度条，支持百分比、高度、是否显示文字与主题色。",
      },
    },
  },
  args: {
    percent: 60,
    strokeHeight: 15,
    showText: true,
    theme: "primary" as ThemeProps,
  },
  argTypes: {
    percent: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    strokeHeight: {
      control: { type: "number", min: 4, max: 40 },
    },
    showText: {
      control: { type: "boolean" },
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
    styles: {
      control: { type: "object" },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "默认",
  args: {},
  render: (args) => (
    <div style={{ width: 320 }}>
      <Progress {...args} />
    </div>
  ),
};

export const NoText: Story = {
  name: "隐藏文字",
  args: {
    percent: 45,
    showText: false,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Progress {...args} />
    </div>
  ),
};

export const Themes: Story = {
  name: "多主题对比",
  args: {},
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const themes: ThemeProps[] = [
      "primary",
      "success",
      "warning",
      "danger",
    ];
    return (
      <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
        {themes.map((t) => (
          <Progress key={t} percent={30 + themes.indexOf(t) * 15} theme={t} />
        ))}
      </div>
    );
  },
};

export const Thin: Story = {
  name: "细条",
  args: {
    percent: 75,
    strokeHeight: 6,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Progress {...args} />
    </div>
  ),
};
