import { useState, useEffect } from "react";
function useDebounce(value, delay) {
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var timer = window.setTimeout(function () {
            setDebouncedValue(value);
        }, delay); //用户delay时间后未输入才会更新debounced的值
        return function () {
            clearTimeout(timer);
        }; //当用户连续输入时，每次输入都会触发 value 更新，旧的定时器会被立刻清除，新的定时器重新开始计时。
    }, [value, delay]);
    return debouncedValue;
}
export default useDebounce;
