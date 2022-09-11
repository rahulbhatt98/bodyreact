import { RatingModal } from "../../models";
/**
 * Global Loading reducer
 */
export const ratingRecuer = (
    state: RatingModal = new RatingModal(),
    action: any
) => {
    switch (action.type) {
        
        case "set-rating-data":
            return { ...state, ...action.payload }
        default:
            return state;
    }
};
