import { PaymentModal } from "../../../models";

export const paymentReducer = (
    state: PaymentModal = new PaymentModal(),
    action: any
) => {
    switch (action.type) {
        case "init-transaction":
            return { ...state, ...action.payload }
        case "reset-transaction":
            return new PaymentModal();
        default:
            return state;
    }
};

