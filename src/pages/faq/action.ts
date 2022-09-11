import Utils from "../../utils";
import request from "../../utils/request";
import {  showSkeleton, hideSkeleton } from "../home/actions";



export const getFaqList = (params: any, callback?: any) => {
  return (dispatch: any) => {
    let url = Utils.endPoints.FAQ
    dispatch(showSkeleton())
    request
      .get(url + params)
      .then((resp) => {
          // let detail = resp.data.data;
          // dispatch({
          //   type: "getFaqList",
          //   payload: {
          //     detail: detail,
          //   }
          // });
          if (callback)
            callback(resp.data.data);
        dispatch(hideSkeleton())
      })
      .catch((err) => {
        dispatch(hideSkeleton())
        dispatch({
          type: "show-alert", payload: {
            type: "error",
            message: err?.response?.data?.message
          }
        })
      });
  };
};