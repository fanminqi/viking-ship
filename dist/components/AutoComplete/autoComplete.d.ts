import { FC, ReactElement } from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    /** 输入关键字后拉取候选项，可返回同步数组或 Promise */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 点击选中候选项时触发 */
    onSelect?: (item: DataSourceType) => void;
    /** 自定义候选项渲染 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
