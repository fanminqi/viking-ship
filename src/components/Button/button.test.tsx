import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";
const defaultProps = {
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  className: "klass",
  btnType: "primary",
  size: "lg",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("text Button component", () => {
  it("should render the correct default button", () => {
    render(<Button {...defaultProps}>Nice</Button>);
    const ele = screen.getByText("Nice");
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual("BUTTON");
    expect(ele).toHaveClass("btn btn-default");
    expect(ele).not.toBeDisabled();
    fireEvent.click(ele);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render the correct component based on different props", () => {
    render(<Button {...testProps}>Nice</Button>);
    const element = screen.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-primary btn-lg klass");
  });
  it("should render a link when btnType when btnType equals link and href is provided", () => {
    render(
      <Button btnType="link" href="http://dummyurl">
        Link
      </Button>,
    );
    const element = screen.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });
  it("should render disabled Button when disabled  set ti true", () => {
    render(<Button {...disabledProps}>Nice</Button>);
    const element = screen.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
