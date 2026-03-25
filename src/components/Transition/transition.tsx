import React, { ReactNode, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
  children?: ReactNode;
};
const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  //React 18 兼容版 Transition 组件 的核心逻辑 目的是安全、稳定地给任意子元素绑定 DOM Ref（替代废弃的 findDOMNode）

  const nodeRef = useRef<HTMLElement | null>(null);
  const childNode = wrapper ? (
    // 情况2：wrapper 为 false，且 children 是有效 React 元素 → 克隆元素并绑定 Ref
    <div ref={nodeRef as React.RefObject<HTMLDivElement>}>{children}</div>
  ) : React.isValidElement(children) ? (
    // 情况2：wrapper 为 false，且 children 是有效 React 元素 → 克隆元素并绑定 Ref
    React.cloneElement(children as React.ReactElement<any>, {
      ref: nodeRef,
    })
  ) : (
    // 情况3：children 不是有效元素（文本/数字/null 等）→ 用 span 包裹并绑定 Ref
    <span ref={nodeRef as React.RefObject<HTMLSpanElement>}>{children}</span>
  );

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      nodeRef={nodeRef}
      {...restProps}
    >
      {childNode}
    </CSSTransition>
  );
  // Transition.defaultProps = {
  // unmountOnExit: true,
  // appear: true,
  // };
};
export default Transition;
