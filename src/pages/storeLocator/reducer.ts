import { StoreModal } from "../../models";

/**
 * Global Loading reducer
 */
export const storeReducer = (
    state: StoreModal = new StoreModal(),
    action: any
) => {
    switch (action.type) {
        case "set-store-list":
            return { ...state, ...action.payload };
        case "reset-store-list":
            return { ...state, data: [], showStoreDetail:false};
        case "store-nearest":
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
