import Utils from "../../../../utils"
import request from "../../../../utils/request"
import { hideLoader, hideSkeleton, showLoader, showSkeleton } from "../../../home/actions"


export const getOrderDetails = (payload: {
  id: any,
  itemId: any
}) => {
  let url = Utils.CommonFunctions.replaceUrlParams(Utils.endPoints.ORDER_DETAIL, { ":id": payload.id })
  return request.get(url, {
    params: {
      itemId: payload.itemId
    }
  })
}
export const getReturnPolicy = (callback?: Function) => {
  let url = Utils.endPoints.RETURN_POLICY
  return (dispatch: any) => {
    dispatch(showSkeleton())
    request
      .get(url).then((resp: any) => {
        if (callback)
          callback(resp?.data?.data || {});
        dispatch(hideSkeleton());

      })
      .catch((err) => {
        dispatch(hideSkeleton())
      });
  };
};
export const writeToUs = (payload: any, callback?: Function) => {
  let url = Utils.endPoints.WRITE_TO_US
  return (dispatch: any) => {
    dispatch(showLoader())
    request
      .post(url, payload).then((resp: any) => {
        if (resp) {
          if (callback)
            callback();
          if (resp?.data?.message)
            dispatch({
              type: "show-alert", payload: {
                type: "success",
                message: resp.data.message
              }
            })
        }
        dispatch(hideLoader())
      })
      .catch((err) => {
        dispatch(hideLoader())
      });
  };
};
