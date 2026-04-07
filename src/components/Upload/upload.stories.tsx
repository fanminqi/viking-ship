import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
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
  title: "第十章： Upload",
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
  argTypes: {
    action: {
      description: "必选参数, 上传的地址",
      control: { type: "text" },
      table: { type: { summary: "string" } },
    },
    defaultFileList: {
      description: "上传的文件列表",
      control: { type: "object" },
      table: { type: { summary: "UploadFile[]" } },
    },
    beforeUpload: {
      description: "上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传",
      control: false,
      table: { type: { summary: "(file: File) => boolean | Promise<File>" } },
    },
    onProgress: {
      description: "文件上传时的钩子",
      control: false,
      table: { type: { summary: "(percentage: number, file: UploadFile) => void" } },
    },
    onSuccess: {
      description: "文件上传成功时的钩子",
      control: false,
      table: { type: { summary: "(data: any, file: UploadFile) => void" } },
    },
    onError: {
      description: "文件上传失败时的钩子",
      control: false,
      table: { type: { summary: "(error: any, file: UploadFile) => void" } },
    },
    onChange: {
      description: "文件状态改变时的钩子，上传成功或者失败时都会被调用",
      control: false,
      table: { type: { summary: "(file: UploadFile) => void" } },
    },
    onRemove: {
      description: "文件列表移除文件时的钩子",
      control: false,
      table: { type: { summary: "(file: UploadFile) => void" } },
    },
    headers: {
      description: "设置上传的请求头",
      control: { type: "object" },
      table: { type: { summary: "{ [key: string]: any }" } },
    },
    name: {
      description: "上传的文件字段名",
      control: { type: "text" },
      table: { type: { summary: "string" }, defaultValue: { summary: "'file'" } },
    },
    data: {
      description: "上传时附带的额外参数",
      control: { type: "object" },
      table: { type: { summary: "{ [key: string]: any }" } },
    },
    withCredentials: {
      description: "支持发送 cookie 凭证信息",
      control: { type: "boolean" },
      table: { type: { summary: "boolean" } },
    },
    accept: {
      description: "可选参数, 接受上传的文件类型",
      control: { type: "text" },
      table: { type: { summary: "string" } },
    },
    multiple: {
      description: "是否支持多选文件",
      control: { type: "boolean" },
      table: { type: { summary: "boolean" } },
    },
    drag: {
      description: "是否支持拖拽上传",
      control: { type: "boolean" },
      table: { type: { summary: "boolean" } },
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
