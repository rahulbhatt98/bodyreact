import { CouponListModal } from "../../models";



export const couponReducer = (state = new CouponListModal(), action: any) => {
    switch (action.type) {
      case "getCouponList":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };