//// 引入 jest-dom 的扩展断言方法
import "@testing-library/jest-dom";
import React from "react";
import axios from "axios";

// 引入 React Testing Library 测试工具
// render：渲染组件
// fireEvent：模拟用户事件（点击、拖拽、上传）
// waitFor：等待异步操作完成
// screen：全局查询 DOM 元素
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { Upload, UploadProps } from "./upload";

// 模拟（mock）Icon 组件
jest.mock("../Icon/icon", () => {
  // 返回一个模拟的函数组件
  return (props: any) => {
    // 渲染一个 span，把 icon 名称显示出来，方便测试
    return <span onClick={props.onClick}>{props.icon}</span>;
  };
});
//模拟axios 让组件不会真的发网络请求
jest.mock("axios");

// 把模拟后的 axios 转成 jest 类型，方便使用 mock 功能
const mockedAxios = axios as jest.Mocked<typeof axios>;
// 定义测试用的 Upload 组件参数
const testProps: UploadProps = {
  action: "fakeurl.com", // 上传地址（假的，因为 mock 了 axios）
  onSuccess: jest.fn(), // 上传成功回调（jest 模拟函数）
  onError: jest.fn(), // 上传失败回调
  onChange: jest.fn(), // 文件变化回调
  onRemove: jest.fn(), // 删除文件回调
  drag: true, // 开启拖拽上传
};

// 创建一个测试用的文件对象
// 内容：xyz，文件名：test.png，类型：image/png
const testFile = new File(["xyz"], "test.png", { type: "image/png" });
// 测试套件：test upload component 用来分组多个测试用例
describe("test upload component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  ///////////////////////////////////////////第一个测试用例：基础上传流程
  it("upload process should works fine", async () => {
    // 1. 渲染 Upload 组件，传入测试参数
    render(<Upload {...testProps}>Click to upload</Upload>);

    // 2. 在页面中找到文案是 "Click to upload" 的元素 → 上传区域
    const uploadArea = screen.getByText("Click to upload");

    // 3. 模拟 axios.post 请求成功，返回数据 { data: "cool" }
    mockedAxios.post.mockResolvedValue({ data: "cool" });

    // 4. 断言：上传区域必须在页面中
    expect(uploadArea).toBeInTheDocument();

    // 5. 模拟用户把文件拖拽丢进上传区域
    fireEvent.drop(uploadArea, {
      dataTransfer: { files: [testFile] }, // 丢入我们创建的测试文件
    });

    // 6. 等待并断言：出现 spinner 图标（加载中）
    expect(await screen.findByText("spinner")).toBeInTheDocument();

    // 7. 等待并断言：出现文件名 test.png
    expect(await screen.findByText("test.png")).toBeInTheDocument();

    // 8. 等待并断言：出现成功图标 check-circle
    expect(await screen.findByText("check-circle")).toBeInTheDocument();

    // 9. 等待异步上传完成
    await waitFor(() => {
      expect(testProps.onSuccess).toHaveBeenCalled();
    });

    // 10. 断言 onSuccess 被调用，参数是 "cool" 和 testFile
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);

    // 11. 断言 onChange 被调用，参数是 testFile
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    // 下面开始测试【删除文件】功能

    // 12. 断言删除图标 times 存在
    expect(screen.getByText("times")).toBeInTheDocument();

    // 13. 模拟点击删除按钮
    fireEvent.click(screen.getByText("times"));

    // 14. 断言文件名消失
    expect(screen.queryByText("test.png")).not.toBeInTheDocument();

    // 15. 断言 onRemove 回调被调用
    expect(testProps.onRemove).toHaveBeenCalled();
  });

  ///////////////////////////////////////////////// 第二个测试用例：拖拽样式 & 拖拽上传

  it("drag and drop files should works fine", async () => {
    // 1. 渲染组件
    render(<Upload {...testProps}>Click to upload</Upload>);

    // 2. 获取上传区域
    const uploadArea = screen.getByText("Click to upload");

    // 3. mock axios 成功
    mockedAxios.post.mockResolvedValue({ data: "cool" });

    // 4. 模拟拖拽经过（dragOver）
    fireEvent.dragOver(uploadArea);

    // 5. 断言：拖拽中样式 is-dragover 被添加
    expect(uploadArea).toHaveClass("is-dragover");

    // 6. 模拟拖拽离开
    fireEvent.dragLeave(uploadArea);

    // 7. 断言：拖拽样式消失
    expect(uploadArea).not.toHaveClass("is-dragover");

    // 8. 模拟拖拽放入文件
    fireEvent.drop(uploadArea, {
      dataTransfer: { files: [testFile] },
    });

    // 9. 等待文件名出现
    expect(await screen.findByText("test.png")).toBeInTheDocument();

    // 10. 等待上传成功回调执行
    await waitFor(() => {
      expect(testProps.onSuccess).toHaveBeenCalled();
    });

    // 11. 断言回调参数正确
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
  });

  it("upload should trigger error state and callbacks when request fails", async () => {
    render(<Upload {...testProps}>Click to upload</Upload>);
    const uploadArea = screen.getByText("Click to upload");
    const mockError = new Error("upload failed");

    mockedAxios.post.mockRejectedValue(mockError);

    fireEvent.drop(uploadArea, {
      dataTransfer: { files: [testFile] },
    });

    expect(await screen.findByText("times-circle")).toBeInTheDocument();
    expect(await screen.findByText("test.png")).toBeInTheDocument();

    await waitFor(() => {
      expect(testProps.onError).toHaveBeenCalled();
    });
    expect(testProps.onError).toHaveBeenCalledWith(mockError, testFile);
    expect(testProps.onSuccess).not.toHaveBeenCalled();
  });
});
