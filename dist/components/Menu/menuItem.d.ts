import React from "react";
export interface MenuItemProps {
    /** 选项索引（由 Menu 内部注入） */
    index?: string;
    /** 选项是否禁用 */
    disabled?: boolean;
    /** 选项扩展 className */
    className?: string;
    /** 选项自定义样式 */
    style?: React.CSSProperties;
    /** 选项内容 */
    children?: React.ReactNode;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
