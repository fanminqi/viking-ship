var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, } from "react";
import Input from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, value = props.value, onSelect = props.onSelect, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "value", "onSelect", "renderOption"]);
    var _a = useState(value || ""), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlinghtIndex = _d[1];
    var debouncedValue = useDebounce(inputValue, 500);
    var TriggerSearch = useRef(false); //是否要进行搜索请求数据
    var componentRef = useRef(null); //用于判断鼠标点击区域 在组件区域外就消除下拉框
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    useEffect(function () {
        setInputValue(value || "");
    }, [value]);
    //搜索变化时suggestion操作
    useEffect(function () {
        if (debouncedValue && TriggerSearch.current) {
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true); //请求的数据正在加载
                results.then(function (data) {
                    setLoading(false); //加载完成
                    setSuggestions(data);
                    console.log("Promise");
                });
            }
            else
                setSuggestions(results);
        }
        else {
            setSuggestions([]);
        }
        setHighlinghtIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length)
            index = suggestions.length - 1;
        setHighlinghtIndex(index);
    };
    //高亮键盘事件处理函数
    var handleKeyDown = function (e) {
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
    var handleChange = function (e) {
        var value = e.target.value;
        setInputValue(value);
        TriggerSearch.current = true; //重新进行请求的发送
    };
    //选择下拉菜单某一项 将它选择到输入框 下拉菜单消失 工具函数
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        TriggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    //渲染下拉菜单
    var generateDropdown = function () {
        return (_jsx("ul", __assign({ className: "viking-suggestion-list" }, { children: suggestions.map(function (item, index) {
                var cnames = classNames("suggestion-item", {
                    "is-active": index === highlightIndex,
                });
                return (_jsx("li", __assign({ onClick: function () {
                        handleSelect(item);
                    }, className: cnames }, { children: renderTemplate(item) }), item.value));
            }) })));
    };
    return (_jsxs("div", __assign({ className: "viking-auto-complete", ref: componentRef }, { children: [_jsx(Input, __assign({ value: inputValue }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })), loading && (_jsx("ul", __assign({ className: "viking-suggestion-list" }, { children: _jsx("li", __assign({ className: "suggestions-loading-icon" }, { children: _jsx(Icon, { icon: "spinner", spin: true }) })) }))), suggestions.length > 0 && generateDropdown()] })));
};
export default AutoComplete;
