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
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Upload, { action: "https://jsonplaceholder.typicode.com/posts/", name: "fileName", data: { Key: "value" }, headers: { "X-P": "hello" }, accept: ".jpg", multiple: true }),
            React.createElement(Upload, { action: "https://www.mocky.io/v2/5cc8019d300000980a055e76" }),
            React.createElement(Icon, { icon: "arrow-down", theme: "primary", size: "10x" }),
            React.createElement(Tabs, { defaultIndex: 0, type: "card" },
                React.createElement(TabItem, { label: "card1" }, "this is card one"),
                React.createElement(TabItem, { label: "card2" }, "this is card two"),
                React.createElement(TabItem, { label: "card3" }, "this is card three")),
            React.createElement(Menu, { defaultIndex: "0", onSelect: function (index) {
                    alert(index);
                }, 
                // mode="vertical"
                defaultOpenSubMenus: ["2"] },
                React.createElement(MenuItem, null, "cool link"),
                React.createElement(MenuItem, { disabled: true }, "cool link 2"),
                React.createElement(SubMenu, { title: "dropdown" },
                    React.createElement(MenuItem, null, "dropdown1"),
                    React.createElement(MenuItem, null, "dropdown2"),
                    React.createElement(MenuItem, null, "dropdown3")),
                React.createElement(MenuItem, null, "cool link 3")),
            React.createElement(Button, { autoFocus: true, btnType: "default", disabled: true, className: "name" }, "Disabled Button"),
            React.createElement(Button, { autoFocus: true, btnType: "default", size: "lg" }, "Large Button"),
            React.createElement(Button, { btnType: "link", href: "http://www.baidu.com", target: "_blank" }, "\u767E\u5EA6link"),
            React.createElement(Button, { autoFocus: true, size: "sm" }, "Small Button"),
            React.createElement(Button, { btnType: "danger", size: "sm" }, "small Danger Button"),
            React.createElement(Button, { btnType: "link", disabled: true }, "Disabled Link"))));
}
export default App;
