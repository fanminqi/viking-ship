import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

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
//context
interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const {
    className,
    mode = "horizontal",
    style,
    children,
    defaultIndex = "0",
    onSelect,
    defaultOpenSubMenus = [],
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus,
  };
  //子组件MenuItem检测
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        //每个 MenuItem 的 index 是由 Menu 在内部根据“孩子的顺序”自动生成并注入的
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        console.error(
          "Warning:Menu has a child which is not a MenuItem component",
        );
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
export default Menu;
