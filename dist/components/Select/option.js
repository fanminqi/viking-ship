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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { SelectContext } from "./context";
export var Option = function (_a) {
    var value = _a.value, label = _a.label, disabled = _a.disabled, children = _a.children, index = _a.index;
    var _b = useContext(SelectContext), onSelect = _b.onSelect, selectedValues = _b.selectedValues, multiple = _b.multiple;
    var isSelected = selectedValues.includes(value);
    var classes = classNames('viking-select-item', {
        'is-disabled': disabled,
        'is-selected': isSelected,
    });
    var handleClick = function (e, value, isSelected) {
        e.preventDefault();
        if (onSelect && !disabled) {
            onSelect(value, isSelected);
        }
    };
    return (_jsxs("li", __assign({ className: classes, onClick: function (e) { handleClick(e, value, isSelected); } }, { children: [children || (label ? label : value), multiple && isSelected && _jsx(Icon, { icon: "check" })] }), index));
};
Option.displayName = 'Option';
export default Option;
