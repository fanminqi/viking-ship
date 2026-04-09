import { FC, ReactNode } from 'react';
export interface SelectOptionProps {
    /** 选项索引（由 Select 内部自动注入） */
    index?: string;
    /** 默认根据此属性值进行筛选，该值不能相同 */
    value: string;
    /** 选项的标签，若不设置则默认与 value 相同 */
    label?: string;
    /** 是否禁用该选项 */
    disabled?: boolean;
    /** 选项内容，优先级高于 label */
    children?: ReactNode;
}
export declare const Option: FC<SelectOptionProps>;
export default Option;
