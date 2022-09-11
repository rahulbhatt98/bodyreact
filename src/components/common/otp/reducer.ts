import { OtpModal } from "../../../models";
// import ActionName from "../../utils/actionName"

/**
 * Global Loading reducer
 */
export const otpReducer = (
  state: OtpModal = new OtpModal(),
  action: any
) => {
  switch (action.type) {
    case "send-otp":
      return {  ...action.payload, show: true, currentDate: Date.now() };
    case "verify-otp":
      return { ...state, ...action.payload };
    case "hide-otp":
      return { ...state, ...action.payload, show: false, currentDate: 0 };
    case "set-otp":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
