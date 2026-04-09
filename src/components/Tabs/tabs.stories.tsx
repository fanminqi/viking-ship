import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import Tabs from "./index";

const meta = {
  title: "Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "支持 `line` / `card` 两种样式，通过 `Tabs.Item` 配置标签与内容。",
      },
    },
  },
  args: {
    onSelect: fn(),
  },
  argTypes: {
    onSelect: {
      ...({ table: { disable: true } } as const),
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  name: "卡片样式",
  args: {},
  render: (args) => (
    <Tabs {...args} type="card" defaultIndex={0}>
      <Tabs.Item label="Tab 1">内容一</Tabs.Item>
      <Tabs.Item label="Tab 2">内容二</Tabs.Item>
      <Tabs.Item label="Tab 3">内容三</Tabs.Item>
    </Tabs>
  ),
};

export const Line: Story = {
  name: "下划线样式",
  args: {},
  render: (args) => (
    <Tabs {...args} type="line" defaultIndex={0}>
      <Tabs.Item label="新闻">新闻内容</Tabs.Item>
      <Tabs.Item label="体育">体育内容</Tabs.Item>
      <Tabs.Item label="科技">科技内容</Tabs.Item>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  name: "含禁用项",
  args: {},
  render: (args) => (
    <Tabs {...args} type="card" defaultIndex={0}>
      <Tabs.Item label="可用">面板 A</Tabs.Item>
      <Tabs.Item label="禁用" disabled>
        面板 B（不可点）
      </Tabs.Item>
      <Tabs.Item label="可用">面板 C</Tabs.Item>
    </Tabs>
  ),
};

export const CustomLabel: Story = {
  name: "自定义标签",
  args: {},
  render: (args) => (
    <Tabs {...args} type="card" defaultIndex={0}>
      <Tabs.Item label={<span style={{ color: "#d4380d" }}>★ 推荐</span>}>
        自定义标签内容
      </Tabs.Item>
      <Tabs.Item label="普通">普通内容</Tabs.Item>
    </Tabs>
  ),
};
