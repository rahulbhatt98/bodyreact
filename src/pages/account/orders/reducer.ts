
import { OrderHistoryModal } from "../../../models"

export const orderHistoryReducer = (state = new OrderHistoryModal(), action: any) => {
  switch (action.type) {
    case "orderHistoryData":
      return { ...state, orderListData: action.payload };
    case "orderHistoryList":
      return { ...state, orderList: action.payload };
    case "selectedOrder":
      return { ...state, selectedOrder: action.payload };
    case "selectedOrderForReturn":
      return { ...state, selectedOrderForReturn: action.payload };
    default:
      return state;
  }
};

