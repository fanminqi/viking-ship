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
import React, { FC, ReactNode } from "react";

export interface TabItemProps {
  /** Tab 选项标签 */
  label: string | React.ReactElement;
  /** Tab 选项是否禁用 */
  disabled?: boolean;
  /** 面板内容 */
  children?: ReactNode;
}

export const TabItem: FC<TabItemProps> = ({ children }) => {
  return <div className="viking-tab-panel">{children}</div>;
};

export default TabItem;
