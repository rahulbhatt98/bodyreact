
import { OfferModal } from "../../models"

export const offerReducer = (state = new OfferModal(), action: any) => {
  switch (action.type) {    
    case "getProductOffers":
      return { ...state, ...action.payload };

    case "getPromotions":
        return { ...state, ...action.payload };

    default:
      return state;
  }
};

