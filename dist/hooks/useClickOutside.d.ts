import { RefObject } from "react";
declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, //ref: 一个 React ref 对象，指向要监听 “点击外部” 的 DOM 元素。
handler: (event: MouseEvent) => void): void;
export default useClickOutside;
