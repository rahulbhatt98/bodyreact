import Utils from "../../utils";
import request from "../../utils/request";
import { showSkeleton, hideSkeleton } from "../home/actions";
import { showLoader, hideLoader } from "../home/actions";

export const getHelpSupportQues = (params: any, callback?: any) => {
  return (dispatch: any) => {
    dispatch(showLoader());
    let url = Utils.endPoints.HELP_SUPPORT;
    request
      .get(url + params)
      .then((resp) => {
        if (callback) callback(resp.data.data);
        dispatch(hideLoader());
      })
      .catch((err) => {
        dispatch(hideSkeleton());
        dispatch(hideLoader());
        dispatch({
          type: "show-alert",
          payload: {
            type: "error",
            message: err?.response?.data?.message,
          },
        });
      });
  };
};

export const getOrderList = (params: any, callback?: any) => {
  return (dispatch: any) => {
    dispatch(showLoader());
    let url = Utils.endPoints.ORDER_ITEM;
    dispatch(showSkeleton());
    request
      .get(url + params)
      .then((resp) => {
        if (resp) {
          if (callback) callback(resp.data.data || {});
        }
        dispatch(hideSkeleton());
        dispatch(hideLoader())
      })
      .catch((err) => {
        dispatch(hideSkeleton());
        dispatch(hideLoader())
        dispatch({
          type: "show-alert",
          payload: {
            type: "error",
            message: err?.response?.data?.message,
          },
        });
      });
  };
};

export const getOlderQueryList = (params: any, callback?: any) => {
  return (dispatch: any) => {
    dispatch(showLoader());
    let url = Utils.endPoints.OLDER_QUERIES;
    dispatch(showSkeleton());
    request
      .get(url + params)
      .then((resp) => {
        if (callback) callback(resp?.data?.data || {});
        dispatch(hideSkeleton());
        dispatch(hideLoader());
      })
      .catch((err) => {
        dispatch(hideSkeleton());
        dispatch(hideLoader());
        dispatch({
          type: "show-alert",
          payload: {
            type: "error",
            message: err?.response?.data?.message,
          },
        });
      });
  };
};
