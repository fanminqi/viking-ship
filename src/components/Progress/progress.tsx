import React, { FC } from "react";
import { ThemeProps } from "../Icon/icon";
export interface ProgressProps {
  /** 进度百分比（0-100） */
  percent: number;
  /** 进度条高度（px） */
  strokeHeight?: number;
  /** 是否显示百分比文字 */
  showText?: boolean;
  /** 外层容器样式 */
  styles?: React.CSSProperties;
  /** 主题色，与 Icon 组件一致 */
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight = 15,
    showText = true,
    styles,
    theme = "primary",
  } = props;
  return (
    <div className="viking-progress-bar" style={styles}>
      <div
        className="viking-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`viking-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

export default Progress;
