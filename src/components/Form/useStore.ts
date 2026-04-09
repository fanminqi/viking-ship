import { useState, useReducer } from "react";
import Schema, { RuleItem, ValidateError } from "async-validator";
import { mapValues, each } from "lodash-es";
// import { FormProps } from "./form";

//自定义规则函数类型
export type CustomRuleFunc = ({ getFieldValue }) => RuleItem;
//普通规则 + 动态规则都支持的总类型
export type CustromRule = RuleItem | CustomRuleFunc;

// FormItemProps 是「用户传给组件的配置」
// FieldDetail 是「组件内部管理的状态」
export interface FieldDetail {
  //单个表单信息
  name: string;
  value: string;
  rules: CustromRule[];
  isValid: boolean; //单个表单是否通过验证
  errors: ValidateError[];
}

export interface FieldsState {
  //Form表单信息
  [key: string]: FieldDetail; //数组中的每一项都是FieldDetail类型
}

export interface ValidateErrorType extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}

export interface FieldsAction {
  //告诉 reducer 要做什么操作。
  //action类型
  type: "addField" | "updateValue" | "updateValidateResult";
  name: string;
  value: any; //表单的信息 包括FormItem中的属性
}

export interface FormState {
  //表单整体状态
  isValid: boolean;
  isSubmitting: boolean; //整个表单正在提交
  /** 与 async-validator 的 err.fields 一致：每个字段对应一组 ValidateError */
  errors: Record<string, ValidateError[]>;
}

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case "addField":
      return {
        ...state,
        [action.name]: { ...action.value },
      };
    case "updateValue":
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      };
    case "updateValidateResult":
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      };
    default:
      return state;
  }
}

function useStore(initialValues?: Record<string, any>) {
  //form state
  const [form, setForm] = useState<FormState>({
    isValid: true,
    isSubmitting: false,
    errors: {},
  });
  const [fields, dispatch] = useReducer(fieldsReducer, {});

  //获取单个表单的数据
  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value;
  };
  //获取所有表单的数据
  const getFieldsValue = () => {
    return mapValues(fields, (item) => item.value);
  };

  const setFieldValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatch({ type: "updateValue", name, value });
    }
  };
  //恢复表单初始值
  const resetFields = () => {
    if (initialValues) {
      each(initialValues, (value, name) => {
        if (fields[name]) {
          dispatch({ type: "updateValue", name, value });
          dispatch({
            type: "updateValidateResult",
            name,
            value: { isValid: true, errors: [] },
          });
        }
      });
    }
    setForm((prev) => ({
      ...prev,
      isValid: true,
      errors: {},
    }));
  };

  //将CustromRule类型转化成ruleItem类型
  const transformRules = (rules: CustromRule[]) => {
    return rules.map((rule) => {
      if (typeof rule === "function") {
        const calledRule = rule({ getFieldValue });
        return calledRule;
      } else {
        return rule;
      }
    });
  };

  ///////////////////////////////单个表单验证
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const afterRules = transformRules(rules);
    //value：用户输入的值 rules：该字段的验证规则
    const descriptor = {
      [name]: afterRules,
      //构造 async-validator 需要的规则格式 eg: { username: [{ required: true, message: "必填" }] }
    };
    const valueMap = {
      [name]: value,
      //构造 要验证的数据格式
    };
    //开始验证
    const validator = new Schema(descriptor);
    //创建一个验证器实例 传入刚才构造的规则 descriptor
    let isValid = true;
    let errors: ValidateError[] = [];

    try {
      await validator.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as ValidateErrorType;
      errors =
        err.errors?.length
          ? err.errors
          : name && err.fields?.[name]
            ? err.fields[name]
            : [];
    } finally {
      console.log("errors", isValid);
      //用 dispatch 把结果更新到全局状态
      dispatch({
        type: "updateValidateResult",
        name,
        value: { isValid, errors },
      });
    }
  };

  //整个表单验证
  const validateAllFields = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};
    const valueMap = mapValues(fields, (item) => item.value);
    //{’username‘：'abc'}
    const descriptor = mapValues(fields, (item) => transformRules(item.rules));
    const validator = new Schema(descriptor);
    setForm({ ...form, isSubmitting: true });
    try {
      await validator.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as ValidateErrorType;
      errors = err.fields;
      each(fields, (value, name) => {
        if (errors[name]) {
          const itemErrors = errors[name];
          dispatch({
            type: "updateValidateResult",
            name,
            value: { isValid: false, errors: itemErrors },
          });
        } else if (value.rules.length > 0 && !errors[name]) {
          dispatch({
            type: "updateValidateResult",
            name,
            value: { isValid: true, errors: [] },
          });
        }
      });
    } finally {
      setForm({ ...form, isSubmitting: false, isValid, errors });
      return {
        isValid,
        errors,
        values: valueMap,
      };
    }
  };
  return {
    fields,
    dispatch,
    form,
    validateField,
    getFieldValue,
    validateAllFields,
    getFieldsValue,
    setFieldValue,
    resetFields,
  };
}
export default useStore;
