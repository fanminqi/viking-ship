import React, { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import Form, { IFormRef } from "./form";
import FormItem from "./formItem";
import Input from "../Input/input";
import Button from "../Button/button";
import { CustromRule } from "./useStore";

const meta = {
  title: "Form 组件",
  id: "Form",
  component: Form,
  tags: ["autodocs"],
  subcomponents: { Item: FormItem },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "表单组件，支持字段校验、动态规则、render props 与实例方法（如 resetFields）。",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "550px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;


export const BasicForm: Story = {
  name: "基础的表单表单",
  args: {},
  parameters: {
    controls: { disable: true },
  },
  render: () =>  (
    <>
   <Form
     initialValues={{
       email: "",
       password: "",
     }}
     onFinish={fn()}
     onFinishFailed={fn()}
   >
     <FormItem
       label="用户名"
       name="email"
       rules={[{ type: "string", required: true, message: "请输入用户名" }]}
     >
       <Input placeholder="请输入用户名" />
     </FormItem>
     <FormItem
       label="密码"
       name="password"
       rules={[{ type: "string", required: true, message: "请输入密码" }]}
     >
       <Input type="password" placeholder="请输入密码" />
     </FormItem>
     <div className="viking-form-submit-area">
       <Button type="submit" btnType="primary">
         登陆
       </Button>
     </div>
   </Form>
   </>
 )
};



export const RegisterForm: Story = {
  name: "注册表单，支持多种 FormItem 组件",
  args: {
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => (
   <Form
     initialValues={{
       email: "",
       password: "",
       gender: "",
       agreement: false,
     }}
     onFinish={fn()}
     onFinishFailed={fn()}
   >
     <FormItem
       label="邮件"
       name="email"
       rules={[{ type: "string", required: true, message: "请输入邮箱" }]}
     >
       <Input placeholder="请输入邮箱" />
     </FormItem>
     <FormItem
       label="密码"
       name="password"
       rules={[
         { type: "string", required: true, message: "请输入密码" },
         { type: "string", min: 4, message: "密码至少 4 位" },
       ]}
     >
       <Input type="password" placeholder="请输入密码" />
     </FormItem>
     <FormItem
       label="性别"
       name="gender"
       rules={[{ type: "string", required: true, message: "请选择性别" }]}
     >
       <select className="viking-input-inner">
         <option value="" disabled>
           请选择性别
         </option>
         <option value="male">男</option>
         <option value="female">女</option>
       </select>
     </FormItem>
     <FormItem
       name="agreement"
       valuePropName="checked"
       getValueFromEvent={(e) => e.target.checked}
       rules={[
         {
           type: "enum",
           enum: [true],
           message: "请先勾选用户协议",
         },
       ]}
     >
       <input type="checkbox" />注册即代表你同意用户协议
     </FormItem>
     <div className="viking-form-submit-area">
       <Button type="submit" btnType="primary">
         登陆
       </Button>
     </div>
   </Form>
 ),
};


   const confirmRules: CustromRule[] = [
  { type: "string", required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue("password")) {
          reject("The two passwords that you entered do not match !!!");
        } else {
          resolve();
        }
      });
    },
  }),
];

export const CustomRuleAndInstance: Story = {
  name: "自定义规则，调用表单实例",
  args: {
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => {
     const ref = useRef<IFormRef>(null); // 正确：在组件内调用 useRef

    const resetAll = () => {
      console.log('form ref', ref.current);
      console.log('get value', ref.current?.getFieldValue('username'));
      ref.current?.resetFields();
    };
    return (
   <Form
     ref={ref}
     initialValues={{
       userName: "fmq",
       password: "pas",
       "no-label": "aaa",
       agreement: true,
     }}
     onFinish={fn()}
     onFinishFailed={fn()}
   >
     {({ isValid, isSubmitting }) => (
       <>
         <FormItem
           label="用户名"
           name="userName"
           rules={[{ type: "string", required: true }]}
         >
           <Input />
         </FormItem>
         <FormItem
           label="密码"
           name="password"
           rules={[{ type: "string", required: true, min: 3, max: 8 }]}
         >
           <Input type="password" />
         </FormItem>
         <FormItem label="重复密码" name="confirm" rules={confirmRules}>
           <Input type="password" />
         </FormItem>
         <FormItem name="no-label">
           <Input placeholder="no-label" />
         </FormItem>
         <FormItem
           name="agreement"
           valuePropName="checked"
           getValueFromEvent={(e) => e.target.checked}
         >
           <input type="checkbox" />
         </FormItem>
         <div className="viking-form-submit-area">
           <Button type="submit" btnType="primary">
             登陆
             {isSubmitting ? "验证中" : "验证完毕"}{" "}
             {isValid ? "验证通过" : "验证未通过"}
           </Button>
           <Button type="button" onClick={resetAll}>
             重置
           </Button>
         </div>
       </>
     )}
   </Form>)
  },
};
