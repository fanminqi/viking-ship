import React, { FC, ReactNode } from "react";
export interface TabItemProps {
    /** Tab 选项标签 */
    label: string | React.ReactElement;
    /** Tab 选项是否禁用 */
    disabled?: boolean;
    /** 面板内容 */
    children?: ReactNode;
}
export declare const TabItem: FC<TabItemProps>;
export default TabItem;
