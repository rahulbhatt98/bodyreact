import { BreadcrumModal } from "../../models";

export const breadCrumReducer = (state = new BreadcrumModal(), action: any) => {
  switch (action.type) {
    case "saveLocationHistory":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};