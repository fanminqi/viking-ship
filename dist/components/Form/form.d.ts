import React, { ReactNode } from "react";
import useStore, { FormState } from "./useStore";
import { ValidateError } from "async-validator";
export type RenderProps = (form: FormState) => ReactNode;
export interface FormProps {
    /** 表单 name 属性 */
    name?: string;
    /** Form.Item 字段初始值 */
    initialValues?: Record<string, any>;
    /** 表单内容，支持节点或 render props */
    children?: ReactNode | RenderProps;
    /** 表单验证成功后回调 */
    onFinish?: (values: Record<string, any>) => void;
    /** 表单验证失败后回调 */
    onFinishFailed?: (
    /** 当前字段值 */
    values: Record<string, any>, 
    /** 字段级错误信息 */
    errors: Record<string, ValidateError[]>) => void;
}
export type IFormContext = Pick<ReturnType<typeof useStore>, "dispatch" | "fields" | "validateField"> & Pick<FormProps, "initialValues">;
export type IFormRef = Omit<ReturnType<typeof useStore>, "dispatch" | "fields" | "form">;
export declare const FormContext: React.Context<IFormContext>;
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<IFormRef>>;
export default Form;
