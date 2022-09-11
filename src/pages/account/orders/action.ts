import Utils from "../../../utils";
import request from "../../../utils/request";
import { hideLoader, showLoader } from "../../home/actions";
import ReactS3Client from 'react-aws-s3-typescript';
import { useDispatch } from "react-redux";



export const getOrderHistory = async (query: string, callback?: Function) => {
  let url = Utils.endPoints.ORDERS
  return await request
    .get(url + query)
};


export const updateOrder = (payload: any, callback?: Function) => {
  return (dispatch: any, getState: any) => {
    dispatch(showLoader())
    let url = Utils.endPoints.ORDERS
    request
      .put(url, payload)
      .then((resp) => {
        if (resp) {
          if (callback && resp?.data?.data)
            callback(resp?.data?.data || {})
          else
            dispatch({
              type: "show-alert",
              payload: {
                type: resp?.data?.statusCode !== 200 && resp?.data?.statusCode !== 201 ? "error" : "success",
                message: 'error',
                // position: "center"
              }
            });
        }
        dispatch(hideLoader())
      })
      .catch((err) => {
        dispatch(hideLoader())
      });
  };
};

export const getReasons = (type: string, callback?: Function) => {
  let url = Utils.endPoints.REASONS + '?type=' + type
  return (dispatch: any) => {
    dispatch(showLoader())
    request
      .get(url).then((resp: any) => {
        if (callback)
          callback(resp?.data?.data || []);
        dispatch(hideLoader())
      })
      .catch((err) => {
        dispatch(hideLoader())
      });
  };
};


export const uploadToZendesk = (file: any) => {
  let url = Utils.endPoints.ZD_UPLOAD;
  var formData = new FormData();
  formData.append("file", file);

  return request.post(url, formData, {
    headers: {
      "content-type": "multipart/form-data"
    }
  })
}


export const uploadToS3 = (fileName: string, file: any, directory?: string, callback?: Function) => {
  const config: any = {
    bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    s3Url: process.env.REACT_APP_PUBLIC_S3_URL,
    dirName: directory ? directory : "orderImages"
  };
  // @ts-ignore
  window.Buffer = window.Buffer || require('buffer').Buffer;
  const s3 = new ReactS3Client(config);
  s3.uploadFile(file, fileName).then((data: any) => {
    if (data.status === 204) {
      if (callback)
        callback(data)
    } else {
    }
  }).catch((err: any) => {
    if (callback)
      callback(null);
  });
}

export const deleteFromS3 = (url: string, callback?: Function) => {
  const config: any = {
    bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    s3Url: process.env.REACT_APP_PUBLIC_S3_URL,
    dirName: "orderImages"
  };
  const s3 = new ReactS3Client(config);
  s3.deleteFile(url).then((data: any) => {
    if (callback)
      callback()
  }).catch((err: any) => {
    const dispatch = useDispatch()
    dispatch(hideLoader())
  });
}

export const returnOrder = (payload: any, callback?: Function) => {
  let url = Utils.endPoints.ORDERS;
  return (dispatch: any) => {
    dispatch(showLoader())
    request
      .put(url, payload).then((resp: any) => {
        if (resp) {
          if (callback)
            callback()
          if (resp?.data?.message)
            dispatch({
              type: 'show-alert',
              payload: {
                type: "success",
                message: resp.data.message,
                // position: "center"
              }
            })
        }
        dispatch(hideLoader())
      })
      .catch((err) => {
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: "error",
              message: err.response.data.message,
              // position: "center"
            }
          })
        dispatch(hideLoader())
      });
  };
};