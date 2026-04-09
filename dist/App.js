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
// import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tabs from "./components/Tabs/Tabs";
import TabItem from "./components/Tabs/TabItem";
import Upload from "./components/Upload/upload";
// import Transition from "./components/Transition/transition";
//FontAwesome React组件
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Icon from "./components/Icon/icon";
library.add(fas);
function App() {
    // const [show, setShow] = useState(false);
    return (_jsx("div", __assign({ className: "App" }, { children: _jsxs("header", __assign({ className: "App-header" }, { children: [_jsx(Upload, { action: "https://jsonplaceholder.typicode.com/posts/", name: "fileName", data: { Key: "value" }, headers: { "X-P": "hello" }, accept: ".jpg", multiple: true }), _jsx(Upload, { action: "https://www.mocky.io/v2/5cc8019d300000980a055e76" }), _jsx(Icon, { icon: "arrow-down", theme: "primary", size: "10x" }), _jsxs(Tabs, __assign({ defaultIndex: 0, type: "card" }, { children: [_jsx(TabItem, __assign({ label: "card1" }, { children: "this is card one" })), _jsx(TabItem, __assign({ label: "card2" }, { children: "this is card two" })), _jsx(TabItem, __assign({ label: "card3" }, { children: "this is card three" }))] })), _jsxs(Menu, __assign({ defaultIndex: "0", onSelect: function (index) {
                        alert(index);
                    }, 
                    // mode="vertical"
                    defaultOpenSubMenus: ["2"] }, { children: [_jsx(MenuItem, { children: "cool link" }), _jsx(MenuItem, __assign({ disabled: true }, { children: "cool link 2" })), _jsxs(SubMenu, __assign({ title: "dropdown" }, { children: [_jsx(MenuItem, { children: "dropdown1" }), _jsx(MenuItem, { children: "dropdown2" }), _jsx(MenuItem, { children: "dropdown3" })] })), _jsx(MenuItem, { children: "cool link 3" })] })), _jsx(Button, __assign({ autoFocus: true, btnType: "default", disabled: true, className: "name" }, { children: "Disabled Button" })), _jsx(Button, __assign({ autoFocus: true, btnType: "default", size: "lg" }, { children: "Large Button" })), _jsx(Button, __assign({ btnType: "link", href: "http://www.baidu.com", target: "_blank" }, { children: "\u767E\u5EA6link" })), _jsx(Button, __assign({ autoFocus: true, size: "sm" }, { children: "Small Button" })), _jsx(Button, __assign({ btnType: "danger", size: "sm" }, { children: "small Danger Button" })), _jsx(Button, __assign({ btnType: "link", disabled: true }, { children: "Disabled Link" }))] })) })));
}
export default App;
