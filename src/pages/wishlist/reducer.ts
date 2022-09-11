import { WishistModal } from "../../models";
import Utils from "../../utils";

export const wishlistReducer = (
    state: WishistModal = new WishistModal(),
    action: any
) => {
    switch (action.type) {
        case Utils.ActionName.WISHLIST:
            let data = action.payload.data ?? state.data;
            if (action.payload.page > 1)
                data = [...state.data, ...action.payload.data];
            return { ...state, ...action.payload, data };
        case Utils.ActionName.WISHLIST_UPDATE:
            const index = state.data.findIndex((item: any) => item._id === action.payload); //finding index of the item
            state.data.splice(index, 1);
            return { ...state, totalCount: state.data.length };
        default:
            return state;
    }
};
