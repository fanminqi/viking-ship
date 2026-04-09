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
import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
var Transition = function (props) {
    var children = props.children, classNames = props.classNames, animation = props.animation, wrapper = props.wrapper, restProps = __rest(props, ["children", "classNames", "animation", "wrapper"]);
    //React 18 兼容版 Transition 组件 的核心逻辑 目的是安全、稳定地给任意子元素绑定 DOM Ref（替代废弃的 findDOMNode）
    var nodeRef = useRef(null);
    var childNode = wrapper ? (
    // 情况2：wrapper 为 false，且 children 是有效 React 元素 → 克隆元素并绑定 Ref
    _jsx("div", __assign({ ref: nodeRef }, { children: children }))) : React.isValidElement(children) ? (
    // 情况2：wrapper 为 false，且 children 是有效 React 元素 → 克隆元素并绑定 Ref
    React.cloneElement(children, {
        ref: nodeRef,
    })) : (
    // 情况3：children 不是有效元素（文本/数字/null 等）→ 用 span 包裹并绑定 Ref
    _jsx("span", __assign({ ref: nodeRef }, { children: children })));
    return (_jsx(CSSTransition, __assign({ classNames: classNames ? classNames : animation, nodeRef: nodeRef }, restProps, { children: childNode })));
    // Transition.defaultProps = {
    // unmountOnExit: true,
    // appear: true,
    // };
};
export default Transition;
