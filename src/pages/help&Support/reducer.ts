import { HelpModal , OrderListModal , OlderQueryModal } from "../../models";



export const helpReducer = (state = new HelpModal(), action: any) => {
  switch (action.type) {
      case "getHelpSupportQues":
        return { ...state, helpData: {...action.payload} };
      default:
        return state;
    }
  };



  export const orderListReducer = (state = new OrderListModal(), action: any) => {
    switch (action.type) {
        case "getOrderList":
          return { ...state, listData: {...action.payload} };
        default:
          return state;
      }
    };

    export const olderQueryListReducer = (state = new OlderQueryModal(), action: any) => {
      switch (action.type) {
          case "getOlderQueryList":
            return { ...state, queryList: {...action.payload} };
          default:
            return state;
        }
      };