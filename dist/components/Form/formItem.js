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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useContext, useEffect, } from "react";
import classNames from "classnames";
import { FormContext } from "./form";
export var FormItem = function (props) {
    var _a, _b;
    var _c = props, label = _c.label, children = _c.children, name = _c.name, _d = _c.valuePropName, valuePropName = _d === void 0 ? "value" : _d, _e = _c.trigger, trigger = _e === void 0 ? "onChange" : _e, _f = _c.getValueFromEvent, getValueFromEvent = _f === void 0 ? function (e) { return e.target.value; } : _f, rules = _c.rules, _g = _c.validateTrigger, validateTrigger = _g === void 0 ? "onBlur" : _g;
    var _h = useContext(FormContext), dispatch = _h.dispatch, fields = _h.fields, initialValues = _h.initialValues, validateField = _h.validateField; //从Form组件拿到的dispatch
    var rowClass = classNames("viking-row", {
        "viking-row-no-label": !label,
    });
    //组件挂载时：注册字段到全局状态
    useEffect(function () {
        var _a, _b;
        var value = valuePropName === "checked"
            ? ((_a = initialValues === null || initialValues === void 0 ? void 0 : initialValues[name]) !== null && _a !== void 0 ? _a : false)
            : ((_b = initialValues === null || initialValues === void 0 ? void 0 : initialValues[name]) !== null && _b !== void 0 ? _b : "");
        dispatch({
            type: "addField",
            name: name,
            value: {
                label: label,
                name: name,
                value: value,
                rules: rules || [],
                errors: [],
                isValid: true,
            },
        });
    }, []);
    //从全局状态里取出当前字段的值，用来绑定到输入框。
    // 首次渲染时 addField 尚未在 useEffect 中执行，fields[name] 不存在；
    // 若此时把 value 设为 undefined，原生 input 会先非受控再受控，触发 React 警告。
    var fieldState = fields[name];
    var value = fieldState !== undefined
        ? fieldState.value
        : valuePropName === "checked"
            ? ((_a = initialValues === null || initialValues === void 0 ? void 0 : initialValues[name]) !== null && _a !== void 0 ? _a : false)
            : ((_b = initialValues === null || initialValues === void 0 ? void 0 : initialValues[name]) !== null && _b !== void 0 ? _b : "");
    var errors = fieldState && fieldState.errors;
    var isRequired = rules === null || rules === void 0 ? void 0 : rules.some(function (rule) { return typeof rule !== "function" && rule.required; }); ////////////////////////////
    var hasError = errors && errors.length > 0;
    var labelClass = classNames({
        "viking-form-item-required": isRequired,
    });
    var itemClass = classNames("viking-form-item-control", {
        "viking-form-item-has-error": hasError,
    });
    //表单值改变时同步更改store中的value值
    var onValueUpdate = function (e) {
        var value = getValueFromEvent(e);
        // if (errors) {
        // console.log(errors[0]);
        // }
        console.log("new value", value);
        dispatch({ type: "updateValue", name: name, value: value });
    };
    //触发时机（如失去焦点）→ 调用验证方法 → 更新验证结果。
    var onValueValidate = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateField(name)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    // 手动创建属性列表（必须用 [valuePropName]，不能写成 .valuePropName）
    var controlProps = {};
    controlProps[valuePropName] = value;
    controlProps[trigger] = onValueUpdate;
    ///////////////////////////////适应不同事件以及属性名称
    if (rules) {
        controlProps[validateTrigger] = onValueValidate;
    }
    //获取children的第一个元素
    var childList = React.Children.toArray(children).filter(function (item) { return React.isValidElement(item); });
    ///////////////////////////////判断children的类型 显示警告
    //没有子组件
    if (childList.length === 0) {
        console.error("No child element found in Form.Item,please provide one from component");
        return null;
    }
    //子组件大于一个
    if (childList.length > 1) {
        console.warn("Only support one child element in formItem, others will be omitted");
    }
    //不是ReactElement
    if (!React.isValidElement(childList[0])) {
        console.error("Child component is not a valid React Element");
    }
    var child = childList[0];
    //cloneElement混合这个child以及手动的属性列表
    var returnChildNode = React.cloneElement(child, __assign(__assign({}, child.props), controlProps));
    return (React.createElement("div", { className: rowClass },
        label && (React.createElement("div", { className: "viking-form-item-label" },
            React.createElement("label", { className: labelClass, title: label }, label))),
        React.createElement("div", { className: "viking-form-item" },
            React.createElement("div", { className: itemClass }, returnChildNode),
            hasError && (React.createElement("div", { className: "viking-form-item-explain" },
                React.createElement("span", null, errors[0].message))))));
};
export default FormItem;
