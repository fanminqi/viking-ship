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
import { useState } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import Transition from "../Transition";
/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'vikingship'
 * ~~~
 */
export var Alert = function (props) {
    var _a;
    var _b = useState(false), hide = _b[0], setHide = _b[1];
    var title = props.title, description = props.description, _c = props.type, type = _c === void 0 ? "default" : _c, onClose = props.onClose, _d = props.closable, closable = _d === void 0 ? true : _d;
    var classes = classNames("viking-alert", (_a = {},
        _a["viking-alert-".concat(type)] = type,
        _a));
    var titleClass = classNames("viking-alert-title", {
        "bold-title": description,
    });
    var handleClose = function (e) {
        if (onClose) {
            onClose();
        }
        setHide(true);
    };
    return (_jsx(Transition, __assign({ in: !hide, timeout: 300, animation: "zoom-in-top", unmountOnExit: true }, { children: _jsxs("div", __assign({ className: classes }, { children: [_jsx("span", __assign({ className: titleClass }, { children: title })), description && _jsx("p", __assign({ className: "viking-alert-desc" }, { children: description })), closable && (_jsx("span", __assign({ className: "viking-alert-close", onClick: handleClose }, { children: _jsx(Icon, { icon: "times" }) })))] })) })));
};
export default Alert;
