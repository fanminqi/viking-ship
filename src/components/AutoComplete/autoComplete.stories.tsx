import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { AutoComplete, DataSourceType } from "./autoComplete";

const lakersWithNumber = [
  { value: "bradley", number: 11 },
  { value: "pope", number: 1 },
  { value: "caruso", number: 4 },
  { value: "cook", number: 2 },
  { value: "cousins", number: 15 },
  { value: "james", number: 23 },
  { value: "AD", number: 3 },
  { value: "green", number: 14 },
  { value: "howard", number: 39 },
  { value: "kuzma", number: 0 },
];

const filterLakers = (query: string): DataSourceType[] =>
  lakersWithNumber.filter((item) => item.value.includes(query));

const renderLakerOption = (item: DataSourceType) => {
  const row = item as DataSourceType<{ value: string; number: number }>;
  return (
    <>
      <strong>{row.value}</strong>
      <span style={{ marginLeft: 8 }}>球衣号码：{row.number}</span>
    </>
  );
};

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface GithubUsersResponse {
  items: GithubUser[];
}

type GithubUserItem = DataSourceType<GithubUser>;

const fetchGithubUsers = (query: string): Promise<DataSourceType[]> => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json() as Promise<GithubUsersResponse>)
    .then(({ items }) =>
      items.slice(0, 10).map(
        (user): GithubUserItem => ({
          value: user.login,
          ...user,
        }),
      ),
    );
};

const meta = {
  // 使用 "AutoComplete" 作为路径，故事 id 为 autocomplete--complete，兼容旧书签 / URL
  title: "AutoComplete",
  component: AutoComplete,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `# AutoComplete 组件

输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择

### 引用方法

\`\`\`javascript
import { AutoComplete } from 'vikingship'
\`\`\`
`,
      },
    },
  },
  args: {
    onSelect: fn(),
    onChange: fn(),
  },
  argTypes: {
    fetchSuggestions: {
      control: false,
      table: { disable: true },
    },
    onSelect: {
      control: false,
      table: { disable: true },
    },
    onChange: {
      control: false,
      table: { disable: true },
    },
    renderOption: {
      control: false,
      table: { disable: true },
    },
    placeholder: {
      control: { type: "text" },
    },
    size: {
      control: { type: "radio" },
      options: ["lg", "sm"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "object" },
    },
    prepend: {
      control: { type: "object" },
    },
    append: {
      control: { type: "object" },
    },



  },
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 导出名 Complete → 故事 id `autocomplete--complete`，与旧版 Storybook 链接一致 */
export const Complete: Story = {
  name: "1 基本的搜索",
  args: {
    placeholder: "输入湖人队球员英文名试试",
    fetchSuggestions: filterLakers,
  },
  render: (args) => <AutoComplete {...args} />,
};

export const CustomRenderTemplate: Story = {
  name: "2 自定义搜索结果模版",
  args: {
    placeholder: "输入湖人队球员英文,自定义下拉模版",
    fetchSuggestions: filterLakers,
    renderOption: renderLakerOption,
  },
  render: (args) => <AutoComplete {...args} />,
};

export const AsyncSearch: Story = {
  name: "3 支持异步搜索",
  args: {
    placeholder: "输入 Github 用户名试试",
    fetchSuggestions: fetchGithubUsers,
  },
  render: (args) => <AutoComplete {...args} />,
};
