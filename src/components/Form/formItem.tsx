import React, {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  ReactElement,
} from "react";
import classNames from "classnames";
import { FormContext } from "./form";
// import { RuleItem } from "async-validator";
import { CustromRule } from "./useStore";

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;
//挑选出一些属性设成必选 再将剩下的属性与其合并\

export interface FormItemProps {
  /** 字段名，对应表单值中的 key */
  name: string;
  /** 标签文本 */
  label?: string;
  /** 表单控件节点（仅支持一个子节点） */
  children?: ReactNode;

  /** 表单值属性名，例如 `value` 或 `checked` */
  valuePropName?: string;
  /** 值变更触发器，例如 `onChange` */
  trigger?: string;
  /** 从事件对象中提取值的方法 */
  getValueFromEvent?: (event: any) => any;
  /** 校验规则数组，支持静态规则和动态规则函数 */
  rules?: CustromRule[];
  /** 触发校验的时机，例如 `onBlur` */
  validateTrigger?: string;
}

export const FormItem: FC<FormItemProps> = (props) => {
  const {
    label,
    children,
    name,
    valuePropName = "value",
    trigger = "onChange",
    getValueFromEvent = (e) => e.target.value,
    rules,
    validateTrigger = "onBlur",
  } = props as SomeRequired<
    FormItemProps,
    "valuePropName" | "trigger" | "getValueFromEvent" | "validateTrigger"
  >;
  const { dispatch, fields, initialValues, validateField } =
    useContext(FormContext); //从Form组件拿到的dispatch
  const rowClass = classNames("viking-row", {
    "viking-row-no-label": !label,
  });
  const hasRegisteredRef = useRef(false);

  //组件挂载时：注册字段到全局状态
  useEffect(() => {
    if (hasRegisteredRef.current) return;
    hasRegisteredRef.current = true;
    const value =
      valuePropName === "checked"
        ? (initialValues?.[name] ?? false)
        : (initialValues?.[name] ?? "");
    dispatch({
      type: "addField",
      name,
      value: {
        label,
        name,
        value: value,
        rules: rules || [],
        errors: [],
        isValid: true,
      },
    });
  }, [dispatch, initialValues, label, name, rules, valuePropName]);

  //从全局状态里取出当前字段的值，用来绑定到输入框。
  // 首次渲染时 addField 尚未在 useEffect 中执行，fields[name] 不存在；
  // 若此时把 value 设为 undefined，原生 input 会先非受控再受控，触发 React 警告。
  const fieldState = fields[name];
  const value =
    fieldState !== undefined
      ? fieldState.value
      : valuePropName === "checked"
        ? (initialValues?.[name] ?? false)
        : (initialValues?.[name] ?? "");
  const errors = fieldState && fieldState.errors;
  const isRequired = rules?.some(
    (rule) => typeof rule !== "function" && rule.required,
  ); ////////////////////////////
  const hasError = errors && errors.length > 0;
  const labelClass = classNames({
    "viking-form-item-required": isRequired,
  });
  const itemClass = classNames("viking-form-item-control", {
    "viking-form-item-has-error": hasError,
  });

  //表单值改变时同步更改store中的value值
  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e);
    // if (errors) {
    // console.log(errors[0]);
    // }
    console.log("new value", value);
    dispatch({ type: "updateValue", name, value });
  };

  //触发时机（如失去焦点）→ 调用验证方法 → 更新验证结果。
  const onValueValidate = async () => {
    await validateField(name);
  };

  // 手动创建属性列表（必须用 [valuePropName]，不能写成 .valuePropName）
  const controlProps: Record<string, any> = {};
  controlProps[valuePropName] = value;
  controlProps[trigger] = onValueUpdate;
  ///////////////////////////////适应不同事件以及属性名称
  if (rules) {
    controlProps[validateTrigger] = onValueValidate;
  }
  //获取children的第一个元素
  const childList = React.Children.toArray(children).filter(
    (item): item is ReactElement => React.isValidElement(item),
  );

  ///////////////////////////////判断children的类型 显示警告
  //没有子组件
  if (childList.length === 0) {
    console.error(
      "No child element found in Form.Item,please provide one from component",
    );
    return null;
  }
  //子组件大于一个
  if (childList.length > 1) {
    console.warn(
      "Only support one child element in formItem, others will be omitted",
    );
  }
  //不是ReactElement
  if (!React.isValidElement(childList[0])) {
    console.error("Child component is not a valid React Element");
  }

  const child = childList[0];
  //cloneElement混合这个child以及手动的属性列表
  const returnChildNode = React.cloneElement(child, {
    ...(child.props as object),
    ...controlProps,
  });

  return (
    <div className={rowClass}>
      {label && (
        <div className="viking-form-item-label">
          <label className={labelClass} title={label}>
            {label}
          </label>
        </div>
      )}
      <div className="viking-form-item">
        <div className={itemClass}>{returnChildNode}</div>
        {hasError && (
          <div className="viking-form-item-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default FormItem;
