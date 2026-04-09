import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Tabs, { TabsProps } from "./Tabs";
import TabItem from "./TabItem";

const testProps: TabsProps = {
  defaultIndex: 1,
  onSelect: jest.fn(),
  type: "line",
};

const renderTabs = () =>
  render(
    <Tabs {...testProps}>
      <TabItem label="tab1">content1</TabItem>
      <TabItem label="tab2">content2</TabItem>
      <TabItem label="disabled" disabled>
        content3
      </TabItem>
    </Tabs>,
  );

describe("test Tabs Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the correct default Tabs", () => {
    renderTabs();
    const navElement = screen.getAllByRole("list")[0];
    expect(navElement).toHaveClass("nav-line");
    const activeElement = screen.getByText("tab2");
    expect(activeElement).toBeInTheDocument();
    expect(activeElement).toHaveClass("is-active");
    expect(screen.queryByText("tab1")).not.toHaveClass("is-active");
    expect(screen.getByText("content2")).toBeInTheDocument();
    expect(screen.queryByText("content1")).not.toBeInTheDocument();
  });
  it("click tabItem should switch to content", () => {
    renderTabs();
    const clickedElement = screen.getByText("tab1");
    fireEvent.click(clickedElement);
    expect(clickedElement).toHaveClass("is-active");
    expect(screen.queryByText("tab2")).not.toHaveClass("is-active");
    expect(screen.getByText("content1")).toBeInTheDocument();
    expect(screen.queryByText("content2")).not.toBeInTheDocument();
    expect(testProps.onSelect).toHaveBeenCalledWith(0);
  });
  it("click disabled tabItem should not works", () => {
    renderTabs();
    const disableElement = screen.getByText("disabled");
    expect(disableElement).toHaveClass("disabled");
    fireEvent.click(disableElement);
    expect(disableElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalled();
  });
});
