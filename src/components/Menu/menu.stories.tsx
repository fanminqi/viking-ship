import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import Menu from "./index";

const meta = {
  title: "Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "支持横向 / 纵向模式，以及 `SubMenu` 子菜单。配合 `Menu.Item`、`Menu.SubMenu` 使用。",
      },
    },
  },
  // 复合组件：子节点由各 Story 的 render 提供
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  name: "横向菜单",
  args: {},
  render: (args) => (
    <Menu {...args} mode="horizontal" defaultIndex="0">
      <Menu.Item>首页</Menu.Item>
      <Menu.Item>产品</Menu.Item>
      <Menu.SubMenu title="更多">
        <Menu.Item>文档</Menu.Item>
        <Menu.Item>更新日志</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ),
};

export const Vertical: Story = {
  name: "纵向菜单",
  args: {},
  render: (args) => (
    <Menu {...args} mode="vertical" defaultIndex="0" style={{ width: 220 }}>
      <Menu.Item>首页</Menu.Item>
      <Menu.Item>产品</Menu.Item>
      <Menu.SubMenu title="更多">
        <Menu.Item>文档</Menu.Item>
        <Menu.Item>更新日志</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ),
};

export const VerticalDefaultOpen: Story = {
  name: "纵向默认展开子菜单",
  args: {},
  render: (args) => (
    <Menu
      {...args}
      mode="vertical"
      defaultIndex="0"
      defaultOpenSubMenus={["2"]}
      style={{ width: 220 }}
    >
      <Menu.Item>首页</Menu.Item>
      <Menu.Item>产品</Menu.Item>
      <Menu.SubMenu title="更多">
        <Menu.Item>文档</Menu.Item>
        <Menu.Item>更新日志</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ),
};

export const WithDisabled: Story = {
  name: "禁用项",
  args: {},
  render: (args) => (
    <Menu {...args} mode="horizontal" defaultIndex="0">
      <Menu.Item>可用</Menu.Item>
      <Menu.Item disabled>禁用</Menu.Item>
      <Menu.Item>可用</Menu.Item>
    </Menu>
  ),
};
