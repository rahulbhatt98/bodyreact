import { getShoppingBagList } from "../../components/common/addToCart/action";
import Utils from "../../utils";
import request from "../../utils/request";
import { showLoader, hideLoader } from "../home/actions";
// import { addCoupon } from "../../utils/event/action";


export const getCouponList = (params: any) => {
  return (dispatch: any, getState: any) => {
    let url = Utils.endPoints.COUPON_LISTING
    dispatch(showLoader())
    request
      .get(url, { params: params })
      .then((resp) => {
        let detail = resp.data.data;
        dispatch({
          type: "getCouponList",
          payload: detail,
        });
        dispatch(hideLoader())
      })
      .catch((err) => {
        dispatch(hideLoader())
        if (err?.response?.data?.message)
          dispatch({
            type: "show-alert", payload: {
              type: "error",
              message: err.response.data.message
            }
          })
      });
  };
};

export const validateCoupon = (params: { couponCode: string, cartId: string }, history: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(showLoader())
    let url = Utils.endPoints.VALIDATE_COUPON
    return request
      .post(url, params).then((resp) => {
        if (resp) {
          // addCoupon({
          //   CouponCode: ,
          //   CouponType: ,
          //   DiscountValue: ,
          //   UserId: `${localStorage.getItem("userId")}`,
          //   CreatedAt: `${Date.now()}`,
          //   CouponValidity: `${}`,
          // })
          history.push(Utils.routes.SHOPPING_BAG)
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
        dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: "show-alert", payload: {
              type: "error",
              message: err.response.data.message
            }
          })
      });
  }
}


export const removeCoupon = (params: { couponId: number, cartId: string }) => {
  return (dispatch: any, getState: any) => {
    let url = Utils.endPoints.REMOVE_COUPON
    dispatch(showLoader())
    request
      .post(url, params)
      .then((resp) => {
        if (resp) {
          dispatch({ type: "updateCart", payload: { coupons: [] } })
          dispatch(getShoppingBagList())
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
        dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: "show-alert", payload: {
              type: "error",
              message: err.response.data.message
            }
          })
      });
  };
};
