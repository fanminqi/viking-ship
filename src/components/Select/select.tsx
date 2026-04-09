import React, {
  FC,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import classNames from "classnames";
import Input from "../Input";
import Icon from "../Icon";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
import Option, { SelectOptionProps } from "./option";
import { SelectContext, ISelectContext } from "./context";

export type { ISelectContext };
export { SelectContext };

export interface SelectProps {
  /** 指定默认选中的条目，可以是字符串或字符串数组 */
  defaultValue?: string | string[];
  /** 选择框默认文字 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否支持多选 */
  multiple?: boolean;
  /** select input 的 name 属性 */
  name?: string;
  /** 选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void;
  /** 子选项，仅支持 `Select.Option` */
  children?: ReactNode;
}

/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'vikingship'
 * // 然后可以使用 <Select> 和 <Select.Option>
 * ~~~
 */
export const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    placeholder = "请选择",
    children,
    multiple,
    name = "viking-select",
    disabled,
    onChange,
    onVisibleChange,
  } = props;
  const input = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useRef(0);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : [],
  );
  const [menuOpen, setOpen] = useState(false);
  const [value, setValue] = useState(
    typeof defaultValue === "string" ? defaultValue : "",
  );
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    if (!multiple) {
      setOpen(false);
      setValue(value);
      if (onVisibleChange) {
        onVisibleChange(false);
      }
    } else {
      setValue("");
    }
    let updatedValues = [value];
    if (multiple) {
      updatedValues = isSelected
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(updatedValues);
    }
    if (onChange) {
      onChange(value, updatedValues);
    }
  };
  useEffect(() => {
    if (input.current) {
      input.current.focus();
      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = "";
      } else {
        if (placeholder) input.current.placeholder = placeholder;
      }
    }
  }, [selectedValues, multiple, placeholder]);
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current =
        containerRef.current.getBoundingClientRect().width;
    }
  });
  useClickOutside(containerRef, () => {
    setOpen(false);
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false);
    }
  });
  const passedContext: ISelectContext = {
    onSelect: handleOptionClick,
    selectedValues: selectedValues,
    multiple: multiple,
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setOpen(!menuOpen);
      if (onVisibleChange) {
        onVisibleChange(!menuOpen);
      }
    }
  };
  const generateOptions = () => {
    return React.Children.map(children, (child, i) => {
      if (React.isValidElement(child) && child.type === Option) {
        return React.cloneElement(
          child as React.ReactElement<SelectOptionProps>,
          { index: `select-${i}` },
        );
      }
      console.error(
        "Warning: Select has a child which is not a Option component",
      );
      return null;
    });
  };
  const containerClass = classNames("viking-select", {
    "menu-is-open": menuOpen,
    "is-disabled": disabled,
    "is-multiple": multiple,
  });
  return (
    <div className={containerClass} ref={containerRef}>
      <div className="viking-select-input" onClick={handleClick}>
        <Input
          ref={input}
          placeholder={placeholder}
          value={value}
          readOnly
          icon="angle-down"
          disabled={disabled}
          name={name}
        />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
          <ul className="viking-select-dropdown">{generateOptions()}</ul>
        </Transition>
      </SelectContext.Provider>
      {multiple && (
        <div
          className="viking-selected-tags"
          style={{ maxWidth: containerWidth.current - 32 }}
        >
          {selectedValues.map((value, index) => {
            return (
              <span className="viking-tag" key={`tag-${index}`}>
                {value}
                <Icon
                  icon="times"
                  onClick={() => {
                    handleOptionClick(value, true);
                  }}
                />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Select;
