/// <reference types="react" />
export interface ISelectContext {
    onSelect?: (value: string, isSelected?: boolean) => void;
    selectedValues: string[];
    multiple?: boolean;
}
export declare const SelectContext: import("react").Context<ISelectContext>;
