import React from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";
export interface IconProps extends FontAwesomeIconProps {
  /** 主题色，会映射为 `icon-${theme}` 样式类 */
  theme?: ThemeProps;
}
const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames("viking-icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>;
};
export default Icon;
