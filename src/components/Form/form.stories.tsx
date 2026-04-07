import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import Form, { IFormRef } from "./form";
import FormItem from "./formItem";
import Input from "../Input/input";
import Button from "../Button/button";
import { CustromRule } from "./useStore";

const meta = {
  title: "Form组件",
  id: "Form",
  component: Form,
  subcomponents: { Item: FormItem },
  decorators: [
    (Story) => (
      <div style={{ width: "550px" }}>
        <Story></Story>
      </div>
    ),
  ],
};
export default meta;

//自定义规则
const confirmRules: CustromRule[] = [
  { type: "string", required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      if (value !== getFieldValue("password")) {
        return Promise.reject(
          "The two passwords that you entered do not match !!!",
        );
      }
      setTimeout(() => {
        return Promise.resolve();
      }, 1000);
    },
  }),
];

export const BasicForm = (args) => {
  const ref = useRef<IFormRef>({} as IFormRef);
  const resetAll = () => {
    ref.current.resetFields();
    console.log("form ref", ref.current);
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
      {...args}
    >
      {({ isValid, isSubmitting }) => (
        <>
          <FormItem
            label="用户名"
            name="userName"
            rules={[{ type: "string", required: true }]}
          >
            <Input></Input>
          </FormItem>

          <FormItem
            label="密码"
            name="password"
            rules={[{ type: "string", required: true, min: 3, max: 8 }]}
          >
            <Input type="password"></Input>
          </FormItem>

          <FormItem label="重复密码" name="confirm" rules={confirmRules}>
            <Input type="password"></Input>
          </FormItem>
          <FormItem name="no-label">
            <Input placeholder="no-label"></Input>
          </FormItem>
          <FormItem
            name="agreement"
            valuePropName="checked"
            getValueFromEvent={(e) => e.target.checked}
          >
            <input type="checkbox"></input>
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
    </Form>
  );
};
