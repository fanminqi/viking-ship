import React, { useContext, FunctionComponentElement, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

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

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  //纵向时默认打开
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpend =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isOpend);

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    // 过长延迟会感觉「展开坏了」；略延迟可减少鼠标划过时误触
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 200);
  };

  //如果当前是 vertical 模式，返回 { onClick: handleClick }
  // 否则返回空对象 {}（不绑定点击事件）
  // 也就是：竖向菜单靠点击展开/收起。
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  // 不是 vertical 时，绑定鼠标移入/移出
  // 移入：handleMouse(..., true) -> 打开
  // 移出：handleMouse(..., false) -> 关闭
  // 是 vertical 时，不绑定 hover 事件
  // 也就是：横向菜单靠 hover 展开/收起。
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classNames("viking-submenu", {
      "menu-opened": menuOpen,
    });

    // 1. 调用 React.Children.map 遍历 children
    //    第一个参数：要遍历的子节点集合（即 SubMenu 标签内包裹的内容）
    //    第二个参数：遍历的回调函数，参数 child = 当前遍历的子元素，i = 子元素的索引
    const childrenComponent = React.Children.map(children, (child, i) => {
      // 含义：告诉 TypeScript：“这个 child 一定是一个 FunctionComponent（函数式组件），且其 Props 符合 MenuItemProps 类型”
      //将强制转换为MenuItemProps类型
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error("Warning:SubMenu has a child which is not a MenuItem");
      }
    });

    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation="zoom-in-top"
        unmountOnExit
        appear
        // appear：控制组件首次挂载时是否执行进入动画
      >
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };

  //render函数
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" onClick={handleClick} {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
