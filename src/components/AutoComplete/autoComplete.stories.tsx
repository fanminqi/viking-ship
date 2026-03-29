import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
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
  argTypes: {
    fetchSuggestions: {
      description:
        "返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise type DataSourceType = T & DataSourceObject",
      type: { name: "function", required: true },
      table: {
        type: {
          summary:
            "(str: string) => DataSourceObject[] | Promise<DataSourceObject[]>",
        },
      },
      control: false,
    },
    onSelect: {
      description: "点击选中建议项时触发的回调",
      table: {
        type: { summary: "(item: DataSourceObject) => void" },
      },
      control: false,
    },
    onChange: {
      description: "文本框发生改变的时候触发的事件",
      table: {
        type: { summary: "((value: string) => void)" },
      },
      control: false,
    },
    renderOption: {
      description: "支持自定义渲染下拉项，返回 ReactElement",
      table: {
        type: {
          summary:
            "(item: DataSourceObject) => ReactElement<any, string | JSXElementConstructor<any>>",
        },
      },
      control: false,
    },
    placeholder: {
      control: { type: "text" },
    },
    size: {
      description: "设置 input 大小，支持 lg 或者 sm",
      control: { type: "radio" },
      options: ["lg", "sm"],
      table: {
        type: { summary: '"lg" | "sm"' },
      },
    },
    disabled: {
      description: "是否禁用 Input",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
      },
    },
    icon: {
      description: "添加图标，在右侧悬浮添加一个图标，用于提示",
      control: { type: "object" },
      table: {
        type: { summary: "IconProp" },
      },
    },
    prepend: {
      description: "添加前缀 用于配置一些固定组合",
      control: { type: "object" },
      table: {
        type: {
          summary:
            "string | ReactElement<any, string | JSXElementConstructor<any>>",
        },
      },
    },
    append: {
      description: "添加后缀 用于配置一些固定组合",
      control: { type: "object" },
      table: {
        type: {
          summary:
            "string | ReactElement<any, string | JSXElementConstructor<any>>",
        },
      },
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
