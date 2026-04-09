import React, {
  forwardRef,
  InputHTMLAttributes,
  ChangeEvent,
  ReactElement,
} from "react";
import Icon from "../Icon/icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";

type InputType = "lg" | "sm";
// InputHTMLAttributes = 原生 input 所有属性
// Omit:因为接口中的size值和InputHTMLAttribute中默认的size值类型冲突 所以忽略InputHTMLAttribute的size属性
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputType;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
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
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const classes = classNames("viking-input-wrapper", {
    "is-disabled": disabled === true,
    [`input-size-${size}`]: size,
    "input-group": prepend || append,
    "input-group-append": !!append, //!!prepend → 有值 = true，没值 = false
    "input-group-prepend": !!prepend,
  });
  if ("value" in props) {
    delete restProps.defaultValue;
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        ref={ref}
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      ></input>
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
});
Input.displayName = "Input";

export default Input;
