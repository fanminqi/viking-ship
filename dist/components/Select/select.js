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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect, } from "react";
import classNames from "classnames";
import Input from "../Input";
import Icon from "../Icon";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
import Option from "./option";
import { SelectContext } from "./context";
export { SelectContext };
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
export var Select = function (props) {
    var defaultValue = props.defaultValue, _a = props.placeholder, placeholder = _a === void 0 ? "请选择" : _a, children = props.children, multiple = props.multiple, _b = props.name, name = _b === void 0 ? "viking-select" : _b, disabled = props.disabled, onChange = props.onChange, onVisibleChange = props.onVisibleChange;
    var input = useRef(null);
    var containerRef = useRef(null);
    var containerWidth = useRef(0);
    var _c = useState(Array.isArray(defaultValue) ? defaultValue : []), selectedValues = _c[0], setSelectedValues = _c[1];
    var _d = useState(false), menuOpen = _d[0], setOpen = _d[1];
    var _e = useState(typeof defaultValue === "string" ? defaultValue : ""), value = _e[0], setValue = _e[1];
    var handleOptionClick = function (value, isSelected) {
        if (!multiple) {
            setOpen(false);
            setValue(value);
            if (onVisibleChange) {
                onVisibleChange(false);
            }
        }
        else {
            setValue("");
        }
        var updatedValues = [value];
        if (multiple) {
            updatedValues = isSelected
                ? selectedValues.filter(function (v) { return v !== value; })
                : __spreadArray(__spreadArray([], selectedValues, true), [value], false);
            setSelectedValues(updatedValues);
        }
        if (onChange) {
            onChange(value, updatedValues);
        }
    };
    useEffect(function () {
        if (input.current) {
            input.current.focus();
            if (multiple && selectedValues.length > 0) {
                input.current.placeholder = "";
            }
            else {
                if (placeholder)
                    input.current.placeholder = placeholder;
            }
        }
    }, [selectedValues, multiple, placeholder]);
    useEffect(function () {
        if (containerRef.current) {
            containerWidth.current =
                containerRef.current.getBoundingClientRect().width;
        }
    });
    useClickOutside(containerRef, function () {
        setOpen(false);
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false);
        }
    });
    var passedContext = {
        onSelect: handleOptionClick,
        selectedValues: selectedValues,
        multiple: multiple,
    };
    var handleClick = function (e) {
        e.preventDefault();
        if (!disabled) {
            setOpen(!menuOpen);
            if (onVisibleChange) {
                onVisibleChange(!menuOpen);
            }
        }
    };
    var generateOptions = function () {
        return React.Children.map(children, function (child, i) {
            if (React.isValidElement(child) && child.type === Option) {
                return React.cloneElement(child, { index: "select-".concat(i) });
            }
            console.error("Warning: Select has a child which is not a Option component");
            return null;
        });
    };
    var containerClass = classNames("viking-select", {
        "menu-is-open": menuOpen,
        "is-disabled": disabled,
        "is-multiple": multiple,
    });
    return (_jsxs("div", __assign({ className: containerClass, ref: containerRef }, { children: [_jsx("div", __assign({ className: "viking-select-input", onClick: handleClick }, { children: _jsx(Input, { ref: input, placeholder: placeholder, value: value, readOnly: true, icon: "angle-down", disabled: disabled, name: name }) })), _jsx(SelectContext.Provider, __assign({ value: passedContext }, { children: _jsx(Transition, __assign({ in: menuOpen, animation: "zoom-in-top", timeout: 300 }, { children: _jsx("ul", __assign({ className: "viking-select-dropdown" }, { children: generateOptions() })) })) })), multiple && (_jsx("div", __assign({ className: "viking-selected-tags", style: { maxWidth: containerWidth.current - 32 } }, { children: selectedValues.map(function (value, index) {
                    return (_jsxs("span", __assign({ className: "viking-tag" }, { children: [value, _jsx(Icon, { icon: "times", onClick: function () {
                                    handleOptionClick(value, true);
                                } })] }), "tag-".concat(index)));
                }) })))] })));
};
export default Select;
