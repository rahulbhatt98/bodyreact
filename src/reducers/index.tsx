import { combineReducers } from "redux";
import { loadingReducer, homeReducer, configReducer } from "../pages/home/reducer";
import { loginReducer, userReducer } from "../pages/login/reducer";
import { otpReducer } from "../components/common/otp/reducer";
import { alertReducer } from "../components/common/alert/reducer";
import { storeReducer } from "../pages/storeLocator/reducer";
import { productReducer, productFilterReducer } from "../pages/productListing/reducer";
import { productDetailReducer } from "../pages/productDetail/reducer";
import { shoppingBagReducer, addressReducer } from "../components/common/addToCart/reducer";
import { wishlistReducer } from "../pages/wishlist/reducer";
import { recommendReducer } from "../components/common/recommendationCarousel/reducer";
import { offerReducer } from "../pages/offers/reducer";
import { userDetailReducer } from "../pages/account/profile/reducer";
import { breadCrumReducer } from "../components/breadCrumb/reducer";
import { giftReducer } from "../pages/giftCard/reducer";
import { orderHistoryReducer } from "../pages/account/orders/reducer";
import { couponReducer } from "../pages/coupon/reducer";
import { faqReducer } from "../pages/faq/reducer";
import { paymentReducer } from "../pages/payment/otherOptions/reducer"
import { ratingRecuer } from "../pages/rating&review/reducer";
import { helpReducer, orderListReducer, olderQueryListReducer } from '../pages/help&Support/reducer';

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STORE") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

/**
 * combine all reducer into single root reducer
 */
const appReducer = combineReducers({
 
  alertReducer,
  addressReducer,
  breadCrumReducer,
  couponReducer,
  configReducer,
  faqReducer,
  giftReducer,
  helpReducer,
  homeReducer,
  loadingReducer,
  loginReducer,
  otpReducer,
  offerReducer,
  orderHistoryReducer,
  olderQueryListReducer,
  orderListReducer,
  paymentReducer,
  productFilterReducer,
  productDetailReducer,
  productReducer,
  recommendReducer,
  ratingRecuer,
  storeReducer,
  shoppingBagReducer,
  userReducer,
  userDetailReducer,
  wishlistReducer,
});

export default rootReducer;
