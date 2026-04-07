import React, { createContext, useState } from "react";
import classNames from "classnames";
export var MenuContext = createContext({ index: "0" });
var Menu = function (props) {
    var className = props.className, _a = props.mode, mode = _a === void 0 ? "horizontal" : _a, style = props.style, children = props.children, _b = props.defaultIndex, defaultIndex = _b === void 0 ? "0" : _b, onSelect = props.onSelect, _c = props.defaultOpenSubMenus, defaultOpenSubMenus = _c === void 0 ? [] : _c;
    var _d = useState(defaultIndex), currentActive = _d[0], setActive = _d[1];
    var classes = classNames("viking-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    //子组件MenuItem检测
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                //每个 MenuItem 的 index 是由 Menu 在内部根据“孩子的顺序”自动生成并注入的
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error("Warning:Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
export default Menu;
