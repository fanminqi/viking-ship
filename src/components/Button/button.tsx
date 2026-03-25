import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classnames from "classnames";
type ButtonSize = "lg" | "sm";
type ButtonType = "primary" | "default" | "danger" | "link";
interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ```javascript
 * import { Button } from 'vikingship'
 * ```
 */

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const {
    btnType = "default",
    disabled = false,
    children,
    size,
    href,
    className,
    ...restProps
  } = props;
  const classes = classnames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: !!disabled,
  });
  if (btnType === "link" && href) {
    //超链接
    return (
      <a
        className={classes}
        href={href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        onClick={(e) => {
          if (disabled) e.preventDefault();
        }}
        {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  } else {
    return (
      //disabled是button原生属性 为ture的话禁用按钮
      <button
        className={classes}
        disabled={disabled}
        {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
};
export default Button;
