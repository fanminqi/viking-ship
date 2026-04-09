var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
export var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1]; //创建当前上传情况数组
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        if (!e.target.files) {
            return;
        }
        uploadFiles(e.target.files);
        if (fileInput.current) {
            fileInput.current.value = "";
        }
    };
    var handleRemove = function (file) {
        setFileList(function (preList) {
            return preList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload)
                post(file);
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    //上传逻辑 工具函数
    var post = function (file) {
        var _file = {
            uid: Date.now() + "upload-file",
            status: "uploading",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        setFileList(function (prevList) { return __spreadArray([_file], prevList, true); });
        var formData = new FormData();
        formData.append(name || "file", file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign({ "Content-Type": "multipart/form-data" }, headers),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var total = e.total;
                var percentage = total && total > 0 ? Math.round((e.loaded * 100) / total) : 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: "uploading" });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            },
        })
            .then(function (res) {
            updateFileList(_file, {
                status: "success",
                percent: 100,
                response: res.data,
            });
            console.log(res);
            if (onSuccess)
                onSuccess(res.data, file);
            if (onChange)
                onChange(file);
        })
            .catch(function (error) {
            updateFileList(_file, { status: "error", error: error });
            console.log(error);
            if (onError)
                onError(error, file);
        });
    };
    return (_jsxs("div", __assign({ className: "viking-upload-component" }, { children: [_jsxs("div", __assign({ onClick: handleClick, className: "viking-upload-input", style: { display: "inline-block" } }, { children: [drag ? (_jsx(Dragger, __assign({ onFile: function (files) {
                            uploadFiles(files);
                        } }, { children: children }))) : (children), _jsx("input", { type: "file", ref: fileInput, className: "viking-file-input viking-input-inner", style: { display: "none" }, onChange: handleFileChange, accept: accept, multiple: multiple })] })), _jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] })));
};
export default Upload;
