import { FC, ReactNode } from "react";
export interface TabsProps {
    defaultIndex?: number;
    className?: string;
    onSelect?: (selectedIndex: number) => void;
    type?: "line" | "card";
    children?: ReactNode;
}
export declare const Tabs: FC<TabsProps>;
export default Tabs;
