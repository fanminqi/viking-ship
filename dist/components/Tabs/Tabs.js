// import React, { useState, createContext } from "react";
// import TabItem from "./TabItem";
// import classNames from "classnames";
// type TabsMode = "hanzi" | "yingwen";
// export interface TabsProps {
//   defaultIndex?: number;
//   onSelect?: (index: number) => void;
//   mode?: TabsMode;
//   className?: string;
// }
// export const TabContext = createContext({});
// const Tabs: React.FC<TabsProps> = (props) => {
//   const { defaultIndex = 0, onSelect, mode = "hanzi", className } = props;
//   const [text, setText] = useState("");
//   const [index, setindex] = useState(defaultIndex);
//   const getText = (text: string) => {
//     setText(text);
//   };
//   const propsocntext = {
//     getText,
//     index,
//     mode,
//   };
//   const classes = classNames("tabs", className, {
//     "mode-hanzi": mode === "hanzi",
//     "mode-yingwen": mode === "yingwen",
//   });
//   return (
//     <div>
//       <ul className={classes}>
//         <TabContext.Provider value={propsocntext}>
//           <TabItem></TabItem>
//         </TabContext.Provider>
//       </ul>
//       {/* <textarea>{text}</textarea> */}
//     </div>
//   );
// };
// export default Tabs;
///////////////////////////////////////////////type为card时还是line的展示效果
import React, { useState, } from "react";
import classNames from "classnames";
export var Tabs = function (props) {
    var _a = props.defaultIndex, defaultIndex = _a === void 0 ? 0 : _a, className = props.className, onSelect = props.onSelect, children = props.children, _b = props.type, type = _b === void 0 ? "card" : _b;
    var _c = useState(defaultIndex), activeIndex = _c[0], setActiveIndex = _c[1];
    var handleClick = function (e, index, disabled) {
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var navClass = classNames("viking-tabs-nav", {
        "nav-line": type === "line",
        "nav-card": type === "card",
    });
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            var classes = classNames("viking-tabs-nav-item", {
                "is-active": activeIndex === index,
                disabled: disabled,
            });
            return (React.createElement("li", { className: classes, key: "nav-item-".concat(index), onClick: function (e) {
                    handleClick(e, index, disabled);
                } }, label));
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === activeIndex) {
                return child;
            }
        });
    };
    return (React.createElement("div", { className: "viking-tabs ".concat(className) },
        React.createElement("ul", { className: navClass }, renderNavLinks()),
        React.createElement("div", { className: "viking-tabs-content" }, renderContent())));
};
export default Tabs;
