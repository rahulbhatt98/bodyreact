import { AlertModal } from "../../../models";
// import ActionName from "../../utils/actionName"

/**
 * Global Loading reducer
 */
export const alertReducer = (
    state: AlertModal = new AlertModal(),
    action: any
) => {
    switch (action.type) {
        case "show-alert":
            return { ...state, ...action.payload, show: true };
        case "hide-alert":
            return { ...state, ...action.payload, show: false };
        default:
            return state;
    }
};
