// import React, { useContext } from "react";
// import classNames from "classnames";
// import { TabContext } from "./Tabs";
// export interface TabItemProps {
//   label?: string;
//   disabled?: boolean;
//   className?: string;
//   children?: React.ReactNode;
// }
// const TabItem: React.FC<TabItemProps> = (props) => {
//   const { label, className, disabled, children } = props;
//   const classes = classNames("Tab-item", className, {
//     disabled: disabled,
//   });
//   const context = useContext(TabContext);
//   // context.getText(children);
//   return <li className={classes}>{children}</li>;
// };
// export default TabItem;
import React from "react";
export var TabItem = function (_a) {
    var children = _a.children;
    return React.createElement("div", { className: "viking-tab-panel" }, children);
};
export default TabItem;
