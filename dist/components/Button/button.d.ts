import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
type ButtonSize = "lg" | "sm";
type ButtonType = "primary" | "default" | "danger" | "link";
interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ```javascript
 * import { Button } from 'vikingship'
 * ```
 */
export declare const Button: FC<ButtonProps>;
export default Button;
