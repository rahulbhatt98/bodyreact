
import { UserDetailModal } from "../../../models"

export const userDetailReducer = (state = new UserDetailModal(), action: any) => {
  switch (action.type) {
    case "getUserProfile":
      const userInfo = { ...action.payload?.userInfo }
      return { ...state, userInfo: { ...userInfo, walletId: userInfo?.walletId, skinType: [...userInfo.skinType] } };
    case "updateUserProfile":
      return { ...state, userInfo: { ...state.userInfo, ...action.payload.userInfo } };
    case "dashboard":
      return { ...state, dashboard: { ...state.dashboard, ...action.payload } };
    case "walletBalance":
      return { ...state, walletBalance:action.payload };
    default:
      return state;
  }
};

