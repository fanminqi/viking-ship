import { RefObject, useEffect } from "react";

//泛型T:让 Hook 支持任意 DOM 元素（div/button/input 等），保证类型安全
function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>, //ref: 一个 React ref 对象，指向要监听 “点击外部” 的 DOM 元素。
  handler: (event: MouseEvent) => void, //点击后回调函数
) {
  //useEffect：组件挂载、更新、卸载时执行的副作用
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    //给整个页面 document 绑定点击事件 只要页面任何地方点击，都会触发 listener
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
