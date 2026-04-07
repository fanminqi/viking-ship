/// <reference types="react" />
import { RuleItem, ValidateError } from "async-validator";
export type CustomRuleFunc = ({ getFieldValue }: {
    getFieldValue: any;
}) => RuleItem;
export type CustromRule = RuleItem | CustomRuleFunc;
export interface FieldDetail {
    name: string;
    value: string;
    rules: CustromRule[];
    isValid: boolean;
    errors: ValidateError[];
}
export interface FieldsState {
    [key: string]: FieldDetail;
}
export interface ValidateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
}
export interface FieldsAction {
    type: "addField" | "updateValue" | "updateValidateResult";
    name: string;
    value: any;
}
export interface FormState {
    isValid: boolean;
    isSubmitting: boolean;
    /** 与 async-validator 的 err.fields 一致：每个字段对应一组 ValidateError */
    errors: Record<string, ValidateError[]>;
}
declare function useStore(initialValues?: Record<string, any>): {
    fields: FieldsState;
    dispatch: import("react").ActionDispatch<[action: FieldsAction]>;
    form: FormState;
    validateField: (name: string) => Promise<void>;
    getFieldValue: (key: string) => string;
    validateAllFields: () => Promise<{
        isValid: boolean;
        errors: Record<string, ValidateError[]>;
        values: {
            [x: string]: string;
        };
    }>;
    getFieldsValue: () => {
        [x: string]: string;
    };
    setFieldValue: (name: string, value: any) => void;
    resetFields: () => void;
};
export default useStore;
