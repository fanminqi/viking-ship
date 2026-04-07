import { FC } from "react";
import { TabsProps } from "./Tabs";
import { TabItemProps } from "./TabItem";
export type ITabsComponent = FC<TabsProps> & {
    Item: FC<TabItemProps>;
};
declare const TransTabs: ITabsComponent;
export default TransTabs;
