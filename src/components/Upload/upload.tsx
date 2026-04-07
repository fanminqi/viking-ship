import React, { ChangeEvent, useRef, useState } from "react";
import Button from "../Button/button";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  //上传的文件类型
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[]; //默认文件列表
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: any }; //自定义headers
  name?: string; //自定义name
  data?: { [key: string]: any }; //自定义data
  withCredentials?: boolean; //跨域请求时，是否自动携带当前域名下的 cookie、HTTP 认证信息、TLS 客户端证书
  accept?: string; //添加限制
  multiple?: boolean; //支持多选
  children?: React.ReactNode;
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
