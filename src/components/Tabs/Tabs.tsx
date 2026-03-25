// import React, { useState, createContext } from "react";
// import TabItem from "./TabItem";
// import classNames from "classnames";

// type TabsMode = "hanzi" | "yingwen";
// export interface TabsProps {
//   defaultIndex?: number;
//   onSelect?: (index: number) => void;
//   mode?: TabsMode;
//   className?: string;
// }
// export const TabContext = createContext({});

// const Tabs: React.FC<TabsProps> = (props) => {
//   const { defaultIndex = 0, onSelect, mode = "hanzi", className } = props;
//   const [text, setText] = useState("");
//   const [index, setindex] = useState(defaultIndex);
//   const getText = (text: string) => {
//     setText(text);
//   };
//   const propsocntext = {
//     getText,
//     index,
//     mode,
//   };

//   const classes = classNames("tabs", className, {
//     "mode-hanzi": mode === "hanzi",
//     "mode-yingwen": mode === "yingwen",
//   });

//   return (
//     <div>
//       <ul className={classes}>
//         <TabContext.Provider value={propsocntext}>
//           <TabItem></TabItem>
//         </TabContext.Provider>
//       </ul>
//       {/* <textarea>{text}</textarea> */}
//     </div>
//   );
// };
// export default Tabs;
///////////////////////////////////////////////type为card时还是line的展示效果
import React, {
  FC,
  useState,
  FunctionComponentElement,
  ReactNode,
} from "react";
import classNames from "classnames";
import { TabItemProps } from "./TabItem";
export interface TabsProps {
  defaultIndex?: number;
  className?: string;
  onSelect?: (selectedIndex: number) => void;
  type?: "line" | "card";
  children?: ReactNode;
}

export const Tabs: FC<TabsProps> = (props) => {
  const {
    defaultIndex = 0,
    className,
    onSelect,
    children,
    type = "card",
  } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const handleClick = (
    e: React.MouseEvent,
    index: number,
    disabled: boolean | undefined,
  ) => {
    if (!disabled) {
      setActiveIndex(index);
      if (onSelect) {
        onSelect(index);
      }
    }
  };
  const navClass = classNames("viking-tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const classes = classNames("viking-tabs-nav-item", {
        "is-active": activeIndex === index,
        disabled: disabled,
      });
      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => {
            handleClick(e, index, disabled);
          }}
        >
          {label}
        </li>
      );
    });
  };
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child;
      }
    });
  };
  return (
    <div className={`viking-tabs ${className}`}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className="viking-tabs-content">{renderContent()}</div>
    </div>
  );
};

export default Tabs;
