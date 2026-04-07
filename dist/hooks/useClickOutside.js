import { useEffect } from "react";
//泛型T:让 Hook 支持任意 DOM 元素（div/button/input 等），保证类型安全
function useClickOutside(ref, //ref: 一个 React ref 对象，指向要监听 “点击外部” 的 DOM 元素。
handler) {
    //useEffect：组件挂载、更新、卸载时执行的副作用
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        //给整个页面 document 绑定点击事件 只要页面任何地方点击，都会触发 listener
        document.addEventListener("click", listener);
        return function () {
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
