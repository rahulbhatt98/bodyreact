import store from "../../store"
import Utils from "../../utils";
import { hideLoader, showLoader } from "../home/actions";
import { updateCartSummary } from "./action";

export const handleUpdateCartSummary = (data: any, checkoutAddressId: any, configs: any, activeStep: number, cardOffer: any,
   walletAmount:any,totalAvailablePoints:number,pointRate:number, flag: string,callback?: any) => {
  // store.dispatch(showLoader());
  // let payload: any = {
  //   cartId: data._id,
  //   donation: data.donation,
  //   productDiscount: Math.abs(data.productDiscount),
  //   isWhatsAppConsent: data.isWhatsAppConsent,
  //   addressId: checkoutAddressId ?? "",
  //   isOrderWrapped: data.isOrderWrapped,
  //   isPaymentScreen: activeStep >= 2 ? true : false,
  //   walletAmount,
  //   totalAvailablePoints,
  //   pointRate
  // };
  // if (cardOffer && data?.grandTotal >= cardOffer?.minimumOrderAmount){
  //   payload.offerId = cardOffer?._id
  // }
  // if (data?.shipping?.shippingType) {
  //   payload.shipping = data?.shipping || {};
  //   payload.shipping.shippingFee =
  //     data?.shipping?.shippingType ===
  //       Utils.constants.shippingType.STANDARD &&
  //       configs?.free_shipping_amount <= data?.grandTotal
  //       ? 0
  //       : parseInt(data?.shipping?.shippingFee ?? 0);
  // }

  // store.dispatch(
  //   updateCartSummary(payload, (resp: any) => {
  //     if (callback && flag == "paytm")
  //       callback(resp?.grandTotal)
  //     else if (callback)
  //       callback()
  //     else store.dispatch(hideLoader());

  //   })
  // );
}

// dispatch(showLoader());
// let payload: any = {
//   walletAmount: wallet ? walletBalance : 0,
//   totalAvailablePoints:
//     rewardData?.AvailablePoints &&
//       reward &&
//       Number(rewardData?.AvailablePoints) > 0
//       ? Number(rewardData?.AvailablePoints)
//       : 0,
//   pointRate:
//     rewardData?.PointRate && reward ? Number(rewardData.PointRate) : 0,
//   isPaymentScreen: true,
// };

// if((!wallet||!reward)&&setcardOffer){
//   setcardOffer(null)
// }
