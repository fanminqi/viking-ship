import React from "react";
type MenuMode = "horizontal" | "vertical";
export interface MenuProps {
    /** 默认 active 的菜单项索引 */
    defaultIndex?: string;
    /** 自定义 className */
    className?: string;
    /** 菜单类型：横向或纵向 */
    mode?: MenuMode;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 点击菜单项后触发，返回选中索引 */
    onSelect?: (selectedIndex: string) => void;
    /** 默认展开的子菜单索引（仅在纵向模式生效） */
    defaultOpenSubMenus?: string[];
    /** 子节点，通常为 `Menu.Item` 与 `Menu.SubMenu` */
    children?: React.ReactNode;
}
interface IMenuContext {
    index: string;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
