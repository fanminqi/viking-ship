import React, {
  ReactNode,
  createContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import useStore, { FormState } from "./useStore";
import { ValidateError } from "async-validator";

export type RenderProps = (form: FormState) => ReactNode;

export interface FormProps {
  /** 表单 name 属性 */
  name?: string;
  /** Form.Item 字段初始值 */
  initialValues?: Record<string, any>;
  /** 表单内容，支持节点或 render props */
  children?: ReactNode | RenderProps;
  /** 表单验证成功后回调 */
  onFinish?: (values: Record<string, any>) => void;
  /** 表单验证失败后回调 */
  onFinishFailed?: (
    /** 当前字段值 */
    values: Record<string, any>,
    /** 字段级错误信息 */
    errors: Record<string, ValidateError[]>,
  ) => void;
}

export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  "dispatch" | "fields" | "validateField"
> &
  Pick<FormProps, "initialValues">;

//组件实例暴露的方法类型
export type IFormRef = Omit<
  ReturnType<typeof useStore>,
  "dispatch" | "fields" | "form"
>;

export const FormContext = createContext({} as IFormContext);

export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const {
    name = "viking-form",
    children,
    initialValues,
    onFinish,
    onFinishFailed,
  } = props;
  const { fields, form, dispatch, ...restProps } = useStore(initialValues);
  const { validateField, validateAllFields } = restProps;

  //自定义forwardRef暴露出去的属性和方法
  useImperativeHandle(ref, () => {
    return {
      ...restProps,
    };
  });

  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };

  //验证表单提交函数
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values } = await validateAllFields();
    if (isValid && onFinish) {
      onFinish(values);
    } else if (onFinishFailed && !isValid) {
      onFinishFailed(values, errors);
    }
  };

  let childrenNode: ReactNode;
  if (typeof children === "function") {
    childrenNode = children(form);
  } else {
    childrenNode = children;
  }
  return (
    <>
      <form name={name} className="viking-form" onSubmit={submitForm}>
        <FormContext.Provider value={passedContext}>
          {childrenNode}
        </FormContext.Provider>
      </form>
    </>
  );
});
export default Form;
