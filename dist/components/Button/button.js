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
import { jsx as _jsx } from "react/jsx-runtime";
import classnames from "classnames";
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ```javascript
 * import { Button } from 'vikingship'
 * ```
 */
export var Button = function (props) {
    var _a;
    var _b = props.btnType, btnType = _b === void 0 ? "default" : _b, _c = props.disabled, disabled = _c === void 0 ? false : _c, children = props.children, size = props.size, href = props.href, className = props.className, restProps = __rest(props, ["btnType", "disabled", "children", "size", "href", "className"]);
    var classes = classnames("btn", className, (_a = {},
        _a["btn-".concat(btnType)] = btnType,
        _a["btn-".concat(size)] = size,
        _a.disabled = !!disabled,
        _a));
    if (btnType === "link" && href) {
        //超链接
        return (_jsx("a", __assign({ className: classes, href: href, "aria-disabled": disabled, tabIndex: disabled ? -1 : undefined, onClick: function (e) {
                if (disabled)
                    e.preventDefault();
            } }, restProps, { children: children })));
    }
    else {
        return (
        //disabled是button原生属性 为ture的话禁用按钮
        _jsx("button", __assign({ className: classes, disabled: disabled }, restProps, { children: children })));
    }
};
export default Button;
