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
  title: "第九章：Input",
  component:Input,
  parameters:{
    layout:'centered',
  },
   tags: ["autodocs"],
   argTypes: {
    placeholder:{
    
      control: { type: "text" },
    },
    disabled:{
      description:'是否禁用Input',
      control:{type:'boolean'},
      table: {
        type: { summary: "boolean" },
      },
    },
    size:{
      description:'设置 input 大小，支持 lg 或者是 sm',
      control:{type:'radio'},
      options:['lg','sm'],
      table: {
        type: { summary: '"lg" | "sm"' },
      },
    },
    icon:{
      description:'添加图标，在右侧悬浮添加一个图标，用于提示',
      control:{type:'object'},
      table: {
        type: { summary: "IconProp" },
      },
    },
    prepend:{
      description:'添加前缀 用于配置一些固定组合',
      control:{type:'text'},
      table: {
        type: {
          summary:
            "string | ReactElement<any, string | JSXElementConstructor<any>>",
        },
      },
    },
    append:{
      description:'添加后缀 用于配置一些固定组合',
      control:{type:'text'},
      table: {
        type: {
          summary:
            "string | ReactElement<any, string | JSXElementConstructor<any>>",
        },
      },
    },
    onChange: {
      table: {
        type: { summary: "((e: ChangeEvent<HTMLInputElement>) => void)" },
      },
      control: false,
    },
   }
}satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const DisabledInput: Story = {
  name: "被禁用的 Input",
  parameters: {
    docs: {
      source: {
        code: `<Input placeholder="disabled input" disabled size="lg" />`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="controlled input" />`,
      },
    },
  },
  render: () => <ControlledInput />,
};

export const WithIcon: Story = {
  name: "带图标的 Input",
  parameters: {
    docs: {
      source: {
        code: `<Input placeholder="input with icon" icon={faMagnifyingGlass} size="lg" />`,
      },
    },
  },
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
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: [
          `<Input placeholder="large size" size="lg" />`,
          `<Input placeholder="small size" size="sm" />`,
        ].join("\n"),
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `<Input placeholder="prepend text" prepend="https://" append=".com" />`,
      },
    },
  },
  render: () => (
    <Input placeholder="prepend text" prepend="https://" append=".com" />
  ),
};
