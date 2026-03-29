import React, { FC, InputHTMLAttributes, ChangeEvent } from "react";
import Icon from "../Icon/icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";

type InputType = "lg" | "sm";
// InputHTMLAttributes = 原生 input 所有属性
// Omit:因为接口中的size值和InputHTMLAttribute中默认的size值类型冲突 所以忽略InputHTMLAttribute的size属性
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  disabled?: boolean;
  size?: InputType;
  icon?: IconProp;
  prepend?: string | React.ReactElement;
  append?: string | React.ReactElement;
  // ChangeEvent<HTMLInputElement>：React 专门为输入元素定义的变更事件类型
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
export const Input: FC<InputProps> = (props) => {
  //取出各种属性
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  //根据属性计算不同的className
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
    //根据属性判断是否要添加特定的节点
    <div className={classes} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
          {/* title：HTML 原生属性，鼠标悬浮时显示的提示文字 */}
        </div>
      )}
      <input
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      ></input>
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};
export default Input;
