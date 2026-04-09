import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import Upload from "./upload";
import Button from "../Button/button";
import Icon from "../Icon/icon";

// const defaultFileList: UploadFile[] = [
  // { uid: "1", size: 1234, name: "test.md", status: "uploading", percent: 30 },
  // { uid: "2", size: 2345, name: "test.png", status: "success" },
  // { uid: "3", size: 3456, name: "test.doc", status: "error" },
// ];

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    window.alert("不能传大于50Kb!");
    return false;
  }
  return true;
};

const meta = {
  title: "Upload",
  component: Upload,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `通过点击或者拖拽,上传文件

### 引用方法

\`\`\`javascript
import { Upload } from 'vikingship'
\`\`\`
`,
      },
    },
  },
  args: {
    onSuccess: fn(),
    onError: fn(),
    onChange: fn(),
    onRemove: fn(),
    onProgress: fn(),
  },
  argTypes: {
    action: {
      control: { type: "text" },
    },
    defaultFileList: {
      control: { type: "object" },
    },
    beforeUpload: {
      control: false,
      table: { disable: true },
    },
    onProgress: {
      control: false,
      table: { disable: true },
    },
    onSuccess: {
      control: false,
      table: { disable: true },
    },
    onError: {
      control: false,
      table: { disable: true },
    },
    onChange: {
      control: false,
      table: { disable: true },
    },
    onRemove: {
      control: false,
      table: { disable: true },
    },
    headers: {
      control: { type: "object" },
    },
    name: {
      control: { type: "text" },
    },
    data: {
      control: { type: "object" },
    },
    withCredentials: {
      control: { type: "boolean" },
    },
    accept: {
      control: { type: "text" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    drag: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UploadComponent: Story = {
  name: "普通的 Upload 组件",
  args: {
    action: "https://jsonplaceholder.typicode.com/posts/",
    
  },
  render: (args) => (
    <Upload {...args}>
      <Button btnType="primary">
        <Icon icon="upload" style={{ marginRight: 6 }} />
        点击上传
      </Button>
    </Upload>
  ),
};

export const CheckFileSize: Story = {
  name: "上传前检查文件大小",
  args: {
    action: "https://jsonplaceholder.typicode.com/posts/",
    beforeUpload: checkFileSize,
  },
  render: (args) => (
    <Upload {...args}>
      <Button btnType="primary">
        <Icon icon="upload" style={{ marginRight: 6 }} />
        不能传大于50Kb!
      </Button>
    </Upload>
  ),
};

export const DragUpload: Story = {
  name: "拖动上传",
  args: {
    action: "https://jsonplaceholder.typicode.com/posts/",
    drag: true,
  },
  render: (args) => (
    <Upload {...args}>
      <>
        <Icon icon="upload" size="5x" theme="secondary" />
        <br />
        点击或者拖动到此区域进行上传
      </>
    </Upload>
  ),
};
