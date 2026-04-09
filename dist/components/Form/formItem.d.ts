import { FC, ReactNode } from "react";
import { CustromRule } from "./useStore";
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
export interface FormItemProps {
    /** 字段名，对应表单值中的 key */
    name: string;
    /** 标签文本 */
    label?: string;
    /** 表单控件节点（仅支持一个子节点） */
    children?: ReactNode;
    /** 表单值属性名，例如 `value` 或 `checked` */
    valuePropName?: string;
    /** 值变更触发器，例如 `onChange` */
    trigger?: string;
    /** 从事件对象中提取值的方法 */
    getValueFromEvent?: (event: any) => any;
    /** 校验规则数组，支持静态规则和动态规则函数 */
    rules?: CustromRule[];
    /** 触发校验的时机，例如 `onBlur` */
    validateTrigger?: string;
}
export declare const FormItem: FC<FormItemProps>;
export default FormItem;
