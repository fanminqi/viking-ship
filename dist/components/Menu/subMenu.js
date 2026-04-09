var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    //纵向时默认打开
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpend = index && context.mode === "vertical"
        ? openedSubMenus.includes(index)
        : false;
    var _b = useState(isOpend), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index,
        "is-opened": menuOpen,
        "is-vertical": context.mode === "vertical",
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        // 过长延迟会感觉「展开坏了」；略延迟可减少鼠标划过时误触
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 200);
    };
    //如果当前是 vertical 模式，返回 { onClick: handleClick }
    // 否则返回空对象 {}（不绑定点击事件）
    // 也就是：竖向菜单靠点击展开/收起。
    var clickEvents = context.mode === "vertical"
        ? {
            onClick: handleClick,
        }
        : {};
    // 不是 vertical 时，绑定鼠标移入/移出
    // 移入：handleMouse(..., true) -> 打开
    // 移出：handleMouse(..., false) -> 关闭
    // 是 vertical 时，不绑定 hover 事件
    // 也就是：横向菜单靠 hover 展开/收起。
    var hoverEvents = context.mode !== "vertical"
        ? {
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false);
            },
        }
        : {};
    var renderChildren = function () {
        var subMenuClasses = classNames("viking-submenu", {
            "menu-opened": menuOpen,
        });
        // 1. 调用 React.Children.map 遍历 children
        //    第一个参数：要遍历的子节点集合（即 SubMenu 标签内包裹的内容）
        //    第二个参数：遍历的回调函数，参数 child = 当前遍历的子元素，i = 子元素的索引
        var childrenComponent = React.Children.map(children, function (child, i) {
            // 含义：告诉 TypeScript：“这个 child 一定是一个 FunctionComponent（函数式组件），且其 Props 符合 MenuItemProps 类型”
            //将强制转换为MenuItemProps类型
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i),
                });
            }
            else {
                console.error("Warning:SubMenu has a child which is not a MenuItem");
            }
        });
        return (_jsx(Transition, __assign({ in: menuOpen, timeout: 300, animation: "zoom-in-top", unmountOnExit: true, appear: true }, { children: _jsx("ul", __assign({ className: subMenuClasses }, { children: childrenComponent })) })));
    };
    //render函数
    return (_jsxs("li", __assign({ className: classes }, hoverEvents, { children: [_jsxs("div", __assign({ className: "submenu-title", onClick: handleClick }, clickEvents, { children: [title, _jsx(Icon, { icon: "angle-down", className: "arrow-icon" })] })), renderChildren()] }), index));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
