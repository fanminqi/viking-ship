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
import { forwardRef, } from "react";
import Icon from "../Icon/icon";
import classNames from "classnames";
/** Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ```javascript
 * //引用方法
 *import { Input } from 'vikingship'
 *```
 *
 *支持HTMLInput的所有基本属性
 */
export var Input = forwardRef(function (props, ref) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
    var classes = classNames("viking-input-wrapper", (_a = {
            "is-disabled": disabled === true
        },
        _a["input-size-".concat(size)] = size,
        _a["input-group"] = prepend || append,
        _a["input-group-append"] = !!append,
        _a["input-group-prepend"] = !!prepend,
        _a));
    if ("value" in props) {
        delete restProps.defaultValue;
    }
    return (_jsxs("div", __assign({ className: classes, style: style }, { children: [prepend && _jsx("div", __assign({ className: "viking-input-group-prepend" }, { children: prepend })), icon && (_jsx("div", __assign({ className: "icon-wrapper" }, { children: _jsx(Icon, { icon: icon, title: "title-".concat(icon) }) }))), _jsx("input", __assign({ ref: ref, className: "viking-input-inner", disabled: disabled }, restProps)), append && _jsx("div", __assign({ className: "viking-input-group-append" }, { children: append }))] })));
});
Input.displayName = "Input";
export default Input;
