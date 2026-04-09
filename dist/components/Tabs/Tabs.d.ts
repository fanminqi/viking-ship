import { FC, ReactNode } from "react";
export interface TabsProps {
    /** 默认激活的面板索引 */
    defaultIndex?: number;
    /** 自定义 className */
    className?: string;
    /** 切换标签时触发，返回索引 */
    onSelect?: (selectedIndex: number) => void;
    /** 标签样式：line 或 card */
    type?: "line" | "card";
    /** 子节点，通常为 `Tabs.Item` */
    children?: ReactNode;
}
export declare const Tabs: FC<TabsProps>;
export default Tabs;
