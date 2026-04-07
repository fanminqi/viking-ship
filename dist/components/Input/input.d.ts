import React, { FC, InputHTMLAttributes, ChangeEvent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
type InputType = "lg" | "sm";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
    disabled?: boolean;
    size?: InputType;
    icon?: IconProp;
    prepend?: string | React.ReactElement;
    append?: string | React.ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/** Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ```javascript
 * //引用方法
 *import { Input } from 'vikingship'
 *```
 *
 *支持HTMLInput的所有基本属性
 */
export declare const Input: FC<InputProps>;
export default Input;
