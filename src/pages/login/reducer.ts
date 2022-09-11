import { LoginModal, UserModal } from "../../models";

/**
 * Global Loading reducer
 */
export const loginReducer = (
  state: LoginModal = new LoginModal(),
  action: any
) => {
  switch (action.type) {
    case "reset-otp":
      return new LoginModal();
    case "check-user":
      // return { ...state, ...action.payload };
      return { ...new LoginModal(), ...state, ...action.payload };
    case "reset-user":
      return new LoginModal();
    default:
      return state;
  }
};


export const userReducer = (state: UserModal = new UserModal(), action: any) => {
  switch (action.type) {
    case "login":
      // return { ...state, ...action.payload };
      return { ...action.payload };
    case "logout":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}