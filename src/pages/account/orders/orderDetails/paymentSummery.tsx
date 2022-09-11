import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Hidden,
} from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import PaymentDetailsSkeleton from "../../../../components/common/skeletonList/paymentDetailsSkeleton";
import { ReducersModal } from "../../../../models";
import Utils from "../../../../utils";
import _ from "lodash";
import RecommendationCarousel from "../../../../components/common/recommendationCarousel";
import { useEffect } from "react";
import { getOthersRecommendations } from "../../../../components/common/recommendationCarousel/action";
import { hideSkeleton, showSkeleton } from "../../../home/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paymentSummeryRoot: {
      borderBottom: "1px solid var(--text-color)",
      padding: theme.spacing(1.5, 0),
      display: "flex",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    leftDiv: {
      flexBasis: "25%",
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
    },
    rightDiv: {
      flexBasis: "75%",
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
        marginTop: theme.spacing(1),
      },
    },
    reuseDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing(1.5),
    },
    reuseHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      display: "flex",
      alignItems: "center",
    },
    reuseHeading2: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        inlineSize: "60%",
        lineBreak: "anywhere",
        justifyContent: "end",
      },
    },
    productWeight: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--light-gray)",
    },
    discountIcon: {
      color: "var(--main-opacity)",
      marginLeft: 0.5,
    },
    view: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--main-opacity)",
    },
    grandTotalDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    grandTotal: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--secondary-black)",
    },
    skeltonView: {
      padding: theme.spacing(12, 0),
    },
    transactionDetails: {
      marginTop: "20px",
      width: "100%",
      display: "flex",
      // flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    recommendContainer: {
      width: "100%",
      height: "auto",
      // padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
    },
    skeleton: {
      margin: theme.spacing(2, 0),
    },
  })
);
interface Props {
  orderDetail: any;
}

function PaymentSummary(props: Props) {
  const classes = useStyles();
  let { orderDetail } = props;
  const dispatch = useDispatch();
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const recommendedData =
    useSelector(
      (state: ReducersModal) => state.recommendReducer.recommendedData?.data
    ) || [];

  const reuseAmount = (heading: string, amount: string) => {
    return (
      <div className={classes.reuseDiv}>
        <Typography className={classes.reuseHeading}>{heading}</Typography>
        <Typography className={classes.reuseHeading}>{amount}</Typography>
      </div>
    );
  };
  const displayTransactionField = (heading: string, value: number | string) => {
    let ele: any = null;
    if (value && value !== "") {
      ele = (
        <div className={classes.reuseDiv}>
          <Typography className={classes.reuseHeading}>{heading}</Typography>
          <Typography
            className={
              orderDetail?.transactionId
                ? classes.reuseHeading2
                : classes.reuseHeading
            }
          >
            {value}
          </Typography>
        </div>
      );
    } else ele = null;
    return ele;
  };

  useEffect(() => {
    let params: any = { page: 1, limit: 10, type: "history" };
    dispatch(showSkeleton());
    dispatch(
      getOthersRecommendations(params, () => {
        dispatch(hideSkeleton());
      })
    );
  }, []);

  const paymentMethod = Utils.constants.PAYMENT_METHOD;
  const modeOfPayment = Utils.constants.MODE_OF_PAYMENT;
  let selectedModeOfPayment: any = null;
  for (let mode in paymentMethod) {
    if (paymentMethod[mode] === orderDetail?.paymentMethodSource) {
      selectedModeOfPayment = modeOfPayment[orderDetail.paymentMethodSource];
    }
  }

  const getCamelCase = (str: string) => {
    let strArr = str?.split(" ");
    strArr = strArr?.map((item: string) => {
      return item?.[0]?.toUpperCase() + item?.slice(1)?.toLowerCase();
    });
    return strArr?.join(" ") === "Upi" ? "UPI" : strArr?.join(" ");
  };
  const bagTotal = orderDetail?.items
    ?.map((item: any) => item.quantity)
    .reduce((prev: any, curr: any) => prev + curr, 0);
  return (
    <>
      <div className={classes.paymentSummeryRoot}>
        <div className={classes.leftDiv}>
          {skeletonLoader ? (
            <Skeleton width={130} height={20} />
          ) : (
            <Typography className={classes.heading}>Payment Details</Typography>
          )}
        </div>
        <div className={classes.rightDiv}>
          {skeletonLoader ? (
            <PaymentDetailsSkeleton hideOtherInfo={true} />
          ) : (
            <>
              <div>
                {orderDetail?.orderType === Utils.constants.CART_TYPE.BAG ? (
                  <>
                    {reuseAmount(
                      `Bag Total (${bagTotal} ${
                        bagTotal === 1 ? "item" : "items"
                      })`,
                      `₹ ${Utils.CommonFunctions.addCommaToAmount(
                        orderDetail?.subTotal
                      )}`
                    )}
                    {orderDetail?.productDiscount
                      ? reuseAmount(
                          "Product Discount",
                          `- ₹ ${Utils.CommonFunctions.addCommaToAmount(
                            orderDetail?.productDiscount
                          )}`
                        )
                      : ""}
                    {orderDetail?.couponDiscount
                      ? reuseAmount(
                          "Coupon Discount",
                          `- ₹ ${
                            Utils.CommonFunctions.addCommaToAmount(
                              orderDetail?.couponDiscount
                            ) ?? 0
                          }`
                        )
                      : ""}

                    {orderDetail?.bankOffer?.offerDiscountAmount &&
                    orderDetail?.bankOffer?.offerType !== "deferred"
                      ? reuseAmount(
                          "Bank Discount",
                          `- ₹ ${
                            Utils.CommonFunctions.addCommaToAmount(
                              orderDetail?.bankOffer?.offerDiscountAmount
                            ) ?? 0
                          }`
                        )
                      : ""}
                    {orderDetail?.shippingFee
                      ? reuseAmount(
                          "Delivery Fee",
                          `₹ ${
                            Utils.CommonFunctions.addCommaToAmount(
                              orderDetail?.shippingFee
                            ) ?? 0
                          }`
                        )
                      : ""}
                    {/* {reuseAmount(
                    "Wallet Amount",
                    `₹${orderDetail?.walletAmount ?? 0}`
                  )} */}
                    {orderDetail?.isOrderWrapped
                      ? reuseAmount(
                          "Git Wrap Amount",
                          `₹ ${
                            Utils.CommonFunctions.addCommaToAmount(
                              orderDetail?.giftWrapAmount
                            ) ?? 0
                          }`
                        )
                      : ""}
                  </>
                ) : (
                  <>
                    {reuseAmount(
                      `Item Total (1 item)`,
                      `₹ ${
                        !_.isEmpty(orderDetail?.giftCard?.amount)
                          ? Utils.CommonFunctions.addCommaToAmount(
                              orderDetail?.giftCard?.amount
                            )
                          : Utils.CommonFunctions.addCommaToAmount(
                              orderDetail?.subTotal
                            )
                      }`
                    )}
                  </>
                )}
                {(!_.isEmpty(orderDetail?.giftCard) ||
                  orderDetail?.orderType === Utils.constants.CART_TYPE.BAG) &&
                orderDetail?.donation?.donationAmount ? (
                  <div className={classes.reuseDiv}>
                    <div>
                      <Typography className={classes.reuseHeading}>
                        Donate
                      </Typography>
                      <Typography className={classes.productWeight}>
                        Feeding India Foundation
                      </Typography>
                    </div>
                    <Typography>
                      ₹{" "}
                      {Utils.CommonFunctions.addCommaToAmount(
                        orderDetail?.donation?.donationAmount
                      ) ?? 0}
                    </Typography>
                  </div>
                ) : (
                  <>
                    {/* {reuseAmount(`Sub Total`, `₹ ${orderDetail?.subTotal}`)} */}
                  </>
                )}
              </div>
              <div className={classes.grandTotalDiv}>
                <Typography className={classes.grandTotal}>
                  Grand total
                </Typography>
                <Typography className={classes.grandTotal}>
                  ₹{" "}
                  {Utils.CommonFunctions.addCommaToAmount(
                    orderDetail?.grandTotal
                  )}
                </Typography>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={classes.transactionDetails}>
        <div className={classes.leftDiv}>
          {skeletonLoader ? (
            <Skeleton width={130} height={20} />
          ) : (
            <Typography className={classes.heading}>
              Transaction Details
            </Typography>
          )}
        </div>
        <div className={classes.rightDiv}>
          {skeletonLoader ? (
            <PaymentDetailsSkeleton hideOtherInfo={true} />
          ) : (
            <>
              <div>
                {/* {orderDetail?.orderType === Utils.constants.CART_TYPE.BAG ? */}
                <>
                  {displayTransactionField(
                    `Paid Via`,
                    `${selectedModeOfPayment === "COD" ? "COD" : "ONLINE"}`
                  )}

                  {displayTransactionField(
                    "Wallet Amount",
                    orderDetail?.walletAmount
                      ? `₹ ${Utils.CommonFunctions.addCommaToAmount(
                          orderDetail?.walletAmount
                        )}`
                      : 0
                  )}
                  {displayTransactionField(
                    "Reward Amount",
                    orderDetail?.isPointsBlocked &&
                      orderDetail?.pointDetails?.redeemedPointsValue
                      ? `₹ ${Utils.CommonFunctions.addCommaToAmount(
                          orderDetail?.pointDetails?.redeemedPointsValue
                        )}`
                      : 0
                  )}

                  {/* {displayTransactionField(
                    "Net Banking",
                    `₹${orderDetail?. }`
                  )} */}
                  {/* {selectedModeOfPayment === 'COD' && (orderDetail?.finalOrderStatus !== 3 && orderDetail?.finalOrderStatus !== 4) && */}
                  {/* {(orderDetail?.finalOrderStatus !== 3 && orderDetail?.finalOrderStatus !== 4) &&
                    <>
                      {displayTransactionField(
                        orderDetail?.finalOrderStatus === 9 ? "Paid" : "Amount To Be Collected",
                        `₹ ${orderDetail?.grandTotal - (orderDetail?.walletAmount || 0) ?? 0}`
                      )}
                    </>
                    
                  } */}
                  <>
                    {orderDetail?.paymentMethodSource !== 6 &&
                    orderDetail?.paymentMethodSource !== 8
                      ? displayTransactionField(
                          orderDetail?.paymentMethodSource !== 1
                            ? getCamelCase(selectedModeOfPayment)
                            : orderDetail?.paymentMethodSource === 1 &&
                              orderDetail?.finalOrderStatus !== 8 &&
                              orderDetail?.finalOrderStatus !== 9 &&
                              orderDetail?.finalOrderStatus !== 11
                            ? "Amount To Be Paid"
                            : "Paid",
                          `₹ ${
                            Utils.CommonFunctions.addCommaToAmount(
                              orderDetail?.grandTotal -
                                (orderDetail?.walletAmount || 0) -
                                (orderDetail?.isPointsBlocked
                                  ? orderDetail?.pointDetails
                                      ?.redeemedPointsValue
                                  : 0)
                            ) ?? 0
                          }`
                        )
                      : ""}
                  </>
                  {displayTransactionField(
                    "Transaction ID",
                    `${orderDetail?.transactionId || ""}`
                  )}
                </>
                {/* } */}
              </div>
            </>
          )}
        </div>
      </div>
      {/* <Hidden smUp> */}
      <div className={classes.recommendContainer}>
        {skeletonLoader ? (
          <Typography
            variant="body1"
            className={classes.heading}
            color="primary"
          >
            <Skeleton variant="rectangular" className={classes.skeleton} />
          </Typography>
        ) : recommendedData?.length > 0 ? (
          <Typography
            variant="body1"
            className={classes.heading}
            color="primary"
          >
            Recommended for you
          </Typography>
        ) : null}
        <RecommendationCarousel type="myOrder" />
      </div>
      {/* </Hidden> */}
    </>
  );
}

export default PaymentSummary;
