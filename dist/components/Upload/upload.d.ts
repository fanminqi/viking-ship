import React from "react";
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
    headers?: {
        [key: string]: any;
    };
    /** 上传字段名，默认 `file` */
    name?: string;
    /** 上传时附带的额外参数 */
    data?: {
        [key: string]: any;
    };
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
export declare const Upload: React.FC<UploadProps>;
export default Upload;
