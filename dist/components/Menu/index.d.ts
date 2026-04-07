import { FC } from "react";
import { MenuProps } from "./menu";
import { SubMenuProps } from "./subMenu";
import { MenuItemProps } from "./menuItem";
export type IMeenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: IMeenuComponent;
export default TransMenu;
