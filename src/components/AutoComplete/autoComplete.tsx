import React, {
  useState,
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import "./style.scss";
import useClickOutside from "../../hooks/useClickOutside";

//下拉菜单数据类型
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string,
  ) => DataSourceType[] | Promise<DataSourceType[]>; //接收用户搜索返回对应选项
  onSelect?: (item: DataSourceType) => void; //点击下拉菜单某一项时要执行的函数
  renderOption?: (item: DataSourceType) => ReactElement; //对下拉框元素进行渲染的方法
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, value, onSelect, renderOption, ...restProps } =
    props;

  const [inputValue, setInputValue] = useState((value as string) || "");
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlinghtIndex] = useState(-1);
  const debouncedValue = useDebounce(inputValue, 500);
  const TriggerSearch = useRef(false); //是否要进行搜索请求数据
  const componentRef = useRef<HTMLDivElement>(null); //用于判断鼠标点击区域 在组件区域外就消除下拉框

  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    setInputValue((value as string) || "");
  }, [value]);

  //搜索变化时suggestion操作
  useEffect(() => {
    if (debouncedValue && TriggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true); //请求的数据正在加载
        results.then((data) => {
          setLoading(false); //加载完成
          setSuggestions(data);
          console.log("Promise");
        });
      } else setSuggestions(results);
    } else {
      setSuggestions([]);
    }
    setHighlinghtIndex(-1);
  }, [debouncedValue, fetchSuggestions]);

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHighlinghtIndex(index);
  };

  //高亮键盘事件处理函数
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: //回车
        if (suggestions[highlightIndex])
          handleSelect(suggestions[highlightIndex]);
        break;
      case 38: //向上
        highlight(highlightIndex - 1);
        break;
      case 40: //向下
        highlight(highlightIndex + 1);
        break;
      case 27: //esc
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    TriggerSearch.current = true; //重新进行请求的发送
  };

  //选择下拉菜单某一项 将它选择到输入框 下拉菜单消失 工具函数
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    TriggerSearch.current = false;
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  //渲染下拉菜单
  const generateDropdown = () => {
    return (
      <ul className="viking-suggestion-list">
        {suggestions.map((item, index) => {
          const cnames = classNames("suggestion-item", {
            "is-active": index === highlightIndex,
          });
          return (
            <li
              key={item.value}
              onClick={() => {
                handleSelect(item);
              }}
              className={cnames}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        {...restProps}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></Input>
      {loading && (
        <ul className="viking-suggestion-list">
          <li className="suggestions-loading-icon">
            <Icon icon="spinner" spin></Icon>
          </li>
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
export default AutoComplete;
