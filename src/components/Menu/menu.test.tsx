import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};
const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
  defaultOpenSubMenus: ["4"],
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

describe("test Menu and MenuItem component in default(horizontal) mode", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    document.head.append(createStyleFile());
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should render correct Menu and MenuItem based on default props", () => {
    render(generateMenu(testProps));
    const menuElement = screen.getByRole("list");
    const activeElement = screen.getByText("active");
    const disabledElement = screen.getByText("disabled");
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("viking-menu test menu-horizontal");
    expect(screen.getAllByRole("listitem").length).toEqual(5);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("click items should change active and call the right callback", () => {
    render(generateMenu(testProps));
    const thirdItem = screen.getByText("xyz");
    const activeElement = screen.getByText("active");
    const disabledElement = screen.getByText("disabled");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should show dropdown items when hover on subMenu", async () => {
    render(generateMenu(testProps));
    expect(screen.queryByText("drop1")).not.toBeInTheDocument();
    const dropdownElement = screen.getByText("dropdown");
    fireEvent.mouseEnter(dropdownElement);
    jest.advanceTimersByTime(200);
    await waitFor(() => {
      expect(screen.queryByText("drop1")).toBeVisible();
    });
    fireEvent.click(screen.getByText("drop1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");
    fireEvent.mouseLeave(dropdownElement);
    jest.advanceTimersByTime(200);
    await waitFor(() => {
      expect(screen.queryByText("drop1")).not.toBeInTheDocument();
    });
  });
});
describe("test Menu and MenuItem component in vertical mode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.head.append(createStyleFile());
  });
  it("should render vertical mode when mode is set to vertical", () => {
    render(generateMenu(testVerProps));
    const menuElement = screen.getAllByRole("list")[0];
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show dropdown items when click on subMenu for vertical mode", () => {
    render(generateMenu(testVerProps));
    expect(screen.queryByText("drop1")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("dropdown"));
    expect(screen.getByText("drop1")).toBeVisible();
  });
  it("should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index", () => {
    render(generateMenu(testVerProps));
    expect(screen.queryByText("opened1")).toBeVisible();
  });
});
