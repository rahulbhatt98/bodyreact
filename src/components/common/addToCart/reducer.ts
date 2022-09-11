
import { ShoppingBagModal, AddressModal } from "../../../models"

export const shoppingBagReducer = (state = new ShoppingBagModal(), action: any) => {
    switch (action.type) {
        case "getShoppingBagList":
            return { ...action.payload };
        case "updateCart":
            return {
                ...state,
                ...action.payload,
                isPointsBlocked: action.payload?.isPointsBlocked,
                pointDetails: { ...action.payload?.pointDetails } || {},
                totalWithoutWallet: action.payload.totalWithoutWallet || 0,
                shipping: { ...action.payload.shipping }

            };
        // case "isPointsBlocked":
        //     return { ...state, blocked: action.payload };
        case "clearCart":
            return new ShoppingBagModal();
        default:
            return state;
    }
};

export const addressReducer = (state = new AddressModal(), action: any) => {
    switch (action.type) {
        case "address":
            return { ...state, address: [...action.payload] };
        case "checkoutAddressId":
            return { ...state, checkoutAddressId: action.payload };
        case "addressFlag":
            return { ...state, addressFlag: action.payload };
        default:
            return state;

    }
};

