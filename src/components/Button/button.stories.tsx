import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
// fn() = 生成一个模拟点击事件函数，用于调试
import { fn } from "storybook/test";
import Button from "./button";

// 元数据配置
const meta = {
  title: "第四章：Button",
  component: Button,
  // 页面参数
  parameters: {
    // 让组件在页面居中显示
    layout: "centered",
  },
  //自动生成文档（Props 表格、说明）
  tags: ["autodocs"],
  // 默认传给所有故事的参数
  args: {
    // 给 onClick 绑定一个模拟函数
    onClick: fn(),
  },
  // 配置控制面板（右侧面板）显示哪些属性、怎么显示
  argTypes: {
    //按钮内容
    children: {
      description: "按钮内容",
      control: { type: "text" },
    },
    //自定义类名
    className: {
      description: "自定义 className",
      control: { type: "text" },
    },
    //是否禁用
    disabled: {
      description: "按钮是否禁用",
      control: { type: "boolean" },
    },
    //尺寸
    size: {
      description: "按钮尺寸",
      control: { type: "radio" },
      options: ["lg", "sm"],
    },
    //链接地址
    btnType: {
      description: "按钮类型",
      control: { type: "radio" },
      options: ["link", "default", "danger", "primary"],
    },
    //按钮类型
    href: {
      description: "链接地址（btnType=link 时生效）",
      control: { type: "text" },
    },
    //点击事件
    onClick: {
      description: "点击事件",
      action: "clicked",// 点击时在 Actions 面板打印日志
      control: { disable: true },// 不在控制面板显示
      table: { disable: true }, // 不在文档表格显示
    },
  },
  // 类型约束：确保 meta 符合 Button 组件的类型
} satisfies Meta<typeof Button>;

// 把配置导出给 Storybook 识别
export default meta;
// 定义 Story 类型
type Story = StoryObj<typeof meta>;

// ==============================================
// 1. 默认按钮样式
// ==============================================
// 故事名称会显示在左侧菜单
export const ADefault: Story = {
  name: "默认按钮样式",//显示名称
   // 渲染组件
  render: (args) => <Button {...args}>{args.children}</Button>,
  // 这个故事的默认参数
  args: {
    children: "Default Button",
    className: "",
    disabled: false,
    size: "lg",
    btnType: "default",
    href: "",
  },
};

// ==============================================
// 2. 不同尺寸的按钮（组合展示）
// ==============================================
export const BButtonWithSize: Story = {
  name: "不同尺寸的按钮",
  render: (args) => (
    <>
      <Button size="lg" onClick={args.onClick}>
        large button
      </Button>
      <Button size="sm" onClick={args.onClick}>
        small button
      </Button>
    </>
  ),
  // 关闭控制面板（因为是组合展示，不需要改参数）
  parameters: {
    controls: { disable: true },
  },
};

// ==============================================
// 3. 不同类型的按钮（组合展示）
// ==============================================
export const CButtonWithType: Story = {
  name: "不同类型的按钮",
  render: (args) => (
    <>
      <Button btnType="primary" onClick={args.onClick}>
        primary button
      </Button>
      <Button btnType="danger" onClick={args.onClick}>
        danger button
      </Button>
      <Button btnType="link" href="https://baidu.com">
        link button
      </Button>
    </>
  ),
  // 关闭控制面板
  parameters: {
    controls: { disable: true },
  },
};



//storybook总结
// meta = 组件的全局配置（标题、文档、控制面板）
// args = 组件的默认参数
// argTypes = 控制面板怎么显示
// Story = 组件的不同使用示例
// tags: ['autodocs'] = 自动生成文档 + Props 表格
// controls.disable: true = 组合展示时隐藏控制面板