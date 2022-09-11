import { FaqModal } from "../../models";



export const faqReducer = (state = new FaqModal(), action: any) => {
  switch (action.type) {
      case "getFaqList":
        return { ...state, faqData: {...action.payload} };
      default:
        return state;
    }
  };