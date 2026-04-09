import React from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export type ThemeProps = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";
export interface IconProps extends FontAwesomeIconProps {
    /** 主题色，会映射为 `icon-${theme}` 样式类 */
    theme?: ThemeProps;
}
declare const Icon: React.FC<IconProps>;
export default Icon;
