import Utils from "../../utils";
import {
  LoginModal,
 
} from "../../models";


export const signUpReducer = (
  state: LoginModal = new LoginModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.SIGN_UP:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};