import React from "react";
export interface SubMenuProps {
    /** 子菜单索引（由 Menu 内部注入） */
    index?: string;
    /** 子菜单标题 */
    title: string;
    /** 子菜单扩展 className */
    className?: string;
    /** 子菜单内容，通常为多个 `Menu.Item` */
    children?: React.ReactNode;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
