import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  /** 文件唯一标识 */
  uid: string;
  /** 文件大小（字节） */
  size: number;
  /** 文件名 */
  name: string;
  /** 文件状态 */
  status?: UploadFileStatus;
  /** 上传进度（0-100） */
  percent?: number;
  /** 原始 File 对象 */
  raw?: File;
  /** 服务端返回数据 */
  response?: any;
  /** 上传错误信息 */
  error?: any;
}

export interface UploadProps {
  /** 必选参数，上传请求地址 */
  action: string;
  /** 默认文件列表 */
  defaultFileList?: UploadFile[];
  /** 上传前钩子，返回 false 或 rejected Promise 可阻止上传 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 上传进度回调 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传成功回调 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败回调 */
  onError?: (error: any, file: File) => void;
  /** 文件状态变化回调（成功或失败都会触发） */
  onChange?: (file: File) => void;
  /** 移除文件回调 */
  onRemove?: (file: UploadFile) => void;
  /** 自定义请求头 */
  headers?: { [key: string]: any };
  /** 上传字段名，默认 `file` */
  name?: string;
  /** 上传时附带的额外参数 */
  data?: { [key: string]: any };
  /** 跨域请求时是否携带 cookie 等凭证 */
  withCredentials?: boolean;
  /** 可接受上传的文件类型（同原生 input accept） */
  accept?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 上传触发区域内容 */
  children?: React.ReactNode;
  /** 是否启用拖拽上传 */
  drag?: boolean;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []); //创建当前上传情况数组

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>,
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    uploadFiles(e.target.files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((preList) => {
      return preList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) post(file);
      else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  //上传逻辑 工具函数
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "uploading",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => [_file, ...prevList]);
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
        withCredentials,
        onUploadProgress: (e) => {
          const total = e.total;
          const percentage =
            total && total > 0 ? Math.round((e.loaded * 100) / total) : 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        updateFileList(_file, {
          status: "success",
          percent: 100,
          response: res.data,
        });
        console.log(res);
        if (onSuccess) onSuccess(res.data, file);
        if (onChange) onChange(file);
      })
      .catch((error) => {
        updateFileList(_file, { status: "error", error: error });
        console.log(error);
        if (onError) onError(error, file);
      });
  };

  return (
    <div className="viking-upload-component">
      <div
        onClick={handleClick}
        className="viking-upload-input"
        style={{ display: "inline-block" }}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          type="file"
          ref={fileInput}
          className="viking-file-input viking-input-inner"
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  );
};
export default Upload;
