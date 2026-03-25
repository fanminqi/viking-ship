import React, { FC, InputHTMLAttributes } from "react";
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
}

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
  return (
    //根据属性判断是否要添加特定的节点
    <div className={classes} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`}></Icon>
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
