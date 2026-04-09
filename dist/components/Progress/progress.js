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
import { jsx as _jsx } from "react/jsx-runtime";
var Progress = function (props) {
    var percent = props.percent, _a = props.strokeHeight, strokeHeight = _a === void 0 ? 15 : _a, _b = props.showText, showText = _b === void 0 ? true : _b, styles = props.styles, _c = props.theme, theme = _c === void 0 ? "primary" : _c;
    return (_jsx("div", __assign({ className: "viking-progress-bar", style: styles }, { children: _jsx("div", __assign({ className: "viking-progress-bar-outer", style: { height: "".concat(strokeHeight, "px") } }, { children: _jsx("div", __assign({ className: "viking-progress-bar-inner color-".concat(theme), style: { width: "".concat(percent, "%") } }, { children: showText && _jsx("span", __assign({ className: "inner-text" }, { children: "".concat(percent, "%") })) })) })) })));
};
export default Progress;
